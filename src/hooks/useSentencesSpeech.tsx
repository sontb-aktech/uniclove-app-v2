import FirebaseAppCheckHelper from 'helpers/FirebaseAppCheckHelper';
import TextToSpeechHelper from 'helpers/TextToSpeechHelper';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import {useEffect, useRef, useState} from 'react';
import TrackPlayer, {Event} from 'react-native-track-player';
import {useAppDispatch, useAppSelector} from 'stores';
import GPTSlice from 'stores/GPTSlice';
import {updateCountLimits} from 'stores/ModelSlice';
import {getDeviceVoiceCode} from 'stores/TransSlice';
import Constants from 'utils/Constants';
const listLangs: LangType[] = require('json/language.json');

type QueueSpeech = {
  sentence: string;
  sound?: string;
  status: number;
};
let regexEnd = /[.!?:]|\n/g;

const useSentencesSpeech = () => {
  const dispatch = useAppDispatch();
  const [listQueueSpeech, setListQueueSpeech] = useState<QueueSpeech[]>([]);
  const [fileSpeechSuccess, setFileSpeechSuccess] = useState<QueueSpeech>();
  const chatStore = useAppSelector(state => state.chat);
  const useStore = useAppSelector(state => state.user);
  const {audioModel, selectedVoice} = useAppSelector(state => state.model);
  // const threadSetting = useAppSelector(state => state.user).threadSetting;
  const thread = chatStore.thread;
  const settingShow = useStore.setting;
  const langCode = useAppSelector(state => state.trans).langCode;
  const canSpeakRef = useRef(false);
  const sentenceIndexRef = useRef(0);

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      Event.PlaybackQueueEnded,
      () => {
        // store.dispatch(updateCountLimits({modelId: Constants.AUDIO_MODEL_ID}));
        console.log('----- PlaybackQueueEnded');
        if (!listQueueSpeech.length) {
          dispatch(GPTSlice.actions.setIsChatSpeaking(false));
          TrackPlayer.reset().then().catch();
        }
      },
    );
    return () => {
      listener.remove();
    };
  }, [!!listQueueSpeech.length]);

  useEffect(() => {
    let lang = undefined as string | undefined | null;
    if (settingShow?.langCode) {
      lang = settingShow?.langCode;
    } else if (langCode) {
      lang = listLangs.find(item => item.code?.startsWith(langCode))?.code;
    } else {
      lang = getDeviceVoiceCode().code;
    }
    if (lang) {
      TextToSpeechHelper.checkTtsAvalibale(lang);
    }
  }, [settingShow, langCode]);

  useEffect(() => {
    if (listQueueSpeech.length > 0) {
      const queueSpeech = listQueueSpeech[0];
      if (queueSpeech && canSpeakRef.current) {
        dispatch(GPTSlice.actions.setIsChatSpeaking(true));
        console.log('---- prepare sentence', queueSpeech.sentence);
        if (selectedVoice) {
          getFileSpeech(queueSpeech);
        } else {
          playSound(queueSpeech);
        }
      }
    }
  }, [listQueueSpeech[0]?.sentence]);

  useDidUpdateEffect(() => {
    console.log('---- listQueueSpeech', listQueueSpeech);
    if (listQueueSpeech.length > 0) {
      dispatch(GPTSlice.actions.setIsChatSpeaking(true));
    } else if (!selectedVoice) {
      dispatch(GPTSlice.actions.setIsChatSpeaking(false));
    }
  }, [listQueueSpeech]);

  useEffect(() => {
    if (fileSpeechSuccess && canSpeakRef.current) {
      playSound(fileSpeechSuccess);
    }
  }, [fileSpeechSuccess]);

  const handleSpeechSentence = (text?: string, stop?: boolean) => {
    if (!canSpeakRef.current) {
      return;
    }
    if (!text) {
      return;
    }
    let nextText = text.substring(sentenceIndexRef.current);

    if (!nextText) {
      return;
    }

    // xử lý câu để đọc

    let match;
    if (stop) {
      const centence = nextText.trim();
      if (centence) {
        setListQueueSpeech(prev => [...prev, {sentence: nextText, status: 0}]);
      }
    } else {
      while ((match = regexEnd.exec(nextText)) !== null) {
        let endIndex = match.index;
        if (endIndex >= 30) {
          const sentence = nextText.substring(0, endIndex + 1).trim();
          if (sentence) {
            setListQueueSpeech(prev => [...prev, {sentence, status: 0}]);
            sentenceIndexRef.current = sentenceIndexRef.current + endIndex + 1;
            nextText = nextText.substring(endIndex + 1);
          }
        }
      }
    }
  };

  const getFileSpeech = async (queueSpeech: QueueSpeech) => {
    try {
      if (audioModel && selectedVoice) {
        const result = await TextToSpeechHelper.getSoundSpeech(
          queueSpeech.sentence,
          selectedVoice,
          audioModel.model,
          true,
        );
        if (result) {
          console.log('---- getFileSpeechSuccess', queueSpeech.sentence);
          setFileSpeechSuccess({...queueSpeech, sound: result});
        }
      }
    } catch (err) {
      console.log('--- eerrr TrackPlayer', err);
    }
  };

  const playSound = async (queueSpeech: QueueSpeech) => {
    try {
      if (queueSpeech) {
        if (queueSpeech.sound) {
          const appCheckToken = await FirebaseAppCheckHelper.getAppCheckToken();
          await TrackPlayer.add({
            url: queueSpeech.sound,
            headers: appCheckToken
              ? {'X-Firebase-AppCheck': appCheckToken}
              : undefined,
          });
          await TrackPlayer.play();
        } else {
          await TextToSpeechHelper.playSound(undefined, queueSpeech.sentence);
        }
        setListQueueSpeech(prev => {
          const newList = [...prev];
          newList.shift();
          return newList;
        });
      }
    } catch (err) {
      console.log('-- speaking error', err);
    }
  };

  const onStopSpeeching = () => {
    canSpeakRef.current = false;
    setListQueueSpeech([]);
    TextToSpeechHelper.stopSound();
    dispatch(GPTSlice.actions.setIsChatSpeaking(false));
  };

  const onReadySpeaking = (isVoiceToVoice?: boolean) => {
    canSpeakRef.current = !!isVoiceToVoice;
    setListQueueSpeech([]);
    sentenceIndexRef.current = 0;
  };

  const updateVoiceLimits = () => {
    if (canSpeakRef.current && !!selectedVoice && audioModel) {
      dispatch(updateCountLimits({modelId: audioModel?.id}));
    }
  };

  return {
    onReadySpeaking,
    updateVoiceLimits,
    onStopSpeeching,
    handleSpeechSentence,
  };
};

export default useSentencesSpeech;
