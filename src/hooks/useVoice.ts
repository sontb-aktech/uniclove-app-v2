import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
  SpeechVolumeChangeEvent,
} from '@react-native-voice/voice';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';

type ParamTypes = {
  voice?: string;
};
export type VoiceStateType = 'idle' | 'listening' | 'receiving';

const getRemainingTime = (lastTriggeredTime: number, throttleMs: number) => {
  const elapsedTime = Date.now() - lastTriggeredTime;
  const remainingTime = throttleMs - elapsedTime;

  return remainingTime < 0 ? 0 : remainingTime;
};

export default function useVoice(
  // voice: string | null | undefined,
  onResult?: (resultIn: string) => void,
  onSpeechVolume?: () => void,
) {
  const [status, setStatus] = useState<VoiceStateType>('idle');
  const statusRef = useRef<VoiceStateType>('idle');
  const [textSpeech, setTextSpeech] = useState<string | undefined>();
  const textSpeechRef = useRef<string | undefined>();

  const script = useRef<string | undefined>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const lastTriggered = useRef<number>(Date.now());
  const timeoutVoiceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      stop();
      Voice.removeAllListeners();
      Voice.destroy();
    };
  }, []);

  useEffect(() => {
    if (statusRef.current != 'idle') {
      console.log('--- setTimeout', statusRef.current, textSpeechRef.current);
      timeout.current = setTimeout(async () => {
        console.log(
          'stop from timeout',
          statusRef.current,
          textSpeechRef.current,
        );
        await stop(true);
      }, 2500);
      return () => clearTimeout(timeout.current);
    }
  }, [textSpeech]);

  const start = useCallback(async (voiceIn?: string | null) => {
    try {
      console.log('--- start Recording', voiceIn, statusRef.current);

      if (voiceIn && statusRef.current == 'idle') {
        let voiceInOk =
          __DEV__ && Platform.OS == 'ios'
            ? 'en-GB'
            : voiceIn.split('_').join('-');
        setTextSpeech('');
        textSpeechRef.current = '';
        await Voice.stop();
        await Voice.destroy();
        await Voice.start(
          voiceInOk,
          Platform.OS == 'android' && {
            EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 5000,
            EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 5000,
          },
        );
        setStatus('listening');
        statusRef.current = 'listening';
        // stateRef.current = 'listening';
      }
    } catch (err) {
      setStatus('idle');
      statusRef.current = 'idle';
      console.log(err);
    }
  }, []);

  const stop = async (isStopInside?: boolean) => {
    console.log(
      '--- stop',
      statusRef.current,
      textSpeechRef.current,
      'is Outsize',
      isStopInside,
    );
    try {
      if (statusRef.current != 'idle') {
        statusRef.current = 'idle';
        await Voice.stop();
        setStatus('idle');
        if (textSpeechRef.current && isStopInside) {
          onResult?.(textSpeechRef.current);
        }
        if (!isStopInside) {
          textSpeechRef.current = '';
          setTextSpeech('');
        }
        clearTimeout(timeout.current);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSpeechResults = useCallback(
    async (e: SpeechResultsEvent) => {
      console.log('---- onSpeechResults', e.value, statusRef.current);
      if (!e.value) {
        script.current = undefined;
        return;
      }
      const receivedTranscript = e.value[0];
      script.current = receivedTranscript;
      if (receivedTranscript) {
        setTextSpeech(receivedTranscript);
        textSpeechRef.current = receivedTranscript;
      }
      // stop(true);
      // if (Platform.OS === 'ios') {
      //   clearTimeout(timeout.current);
      //   timeout.current = setTimeout(async () => {
      //     if (script.current === receivedTranscript) {
      //       stop(true)
      //     }
      //   }, 1000);
      if (Platform.OS == 'android') {
        await stop();
      }
    },
    [onResult],
  );

  const onSpeechError = useCallback(
    (e: SpeechErrorEvent) => {
      if (e) {
        console.log('--- onSpeechError', e, statusRef.current);
        stop(true);
      } else {
      }
    },
    [onResult],
  );

  const onSpeechVolumeChanged = useCallback(
    (e: SpeechVolumeChangeEvent) => {
      if (e.value && (Platform.OS == 'android' ? e.value > 4 : e.value > 1.5)) {
        // console.log('--- onSpeechVolumeChanged', statusRef.current);
        if (statusRef.current != 'idle') {
          delaySpeechVolume();
        }
      }
    },
    [onSpeechVolume],
  );

  const delaySpeechVolume = () => {
    let remainingTime = getRemainingTime(lastTriggered.current, 500);
    if (remainingTime === 0) {
      lastTriggered.current = Date.now();
      console.log('---- onSpeechVolume');
      onSpeechVolume && onSpeechVolume();
      if (timeoutVoiceRef.current) {
        clearTimeout(timeoutVoiceRef.current);
        timeoutVoiceRef.current = undefined;
      }
    } else if (!timeoutVoiceRef.current) {
      timeoutVoiceRef.current = setTimeout(() => {
        remainingTime = getRemainingTime(lastTriggered.current, 500);
        if (remainingTime === 0 && statusRef.current != 'idle') {
          lastTriggered.current = Date.now();
          console.log('---- onSpeechVolume');
          onSpeechVolume && onSpeechVolume();
          if (timeoutVoiceRef.current) {
            clearTimeout(timeoutVoiceRef.current);
            timeoutVoiceRef.current = undefined;
          }
        }
      }, remainingTime);
    }
  };

  const onSpeechPartialResults = useCallback((e: SpeechResultsEvent) => {
    console.log('--- onSpeechPartialResults', e?.value, statusRef.current);
    if (e?.value?.[0]) {
      if (statusRef.current != 'idle') {
        setTextSpeech(e?.value?.[0] ?? '');
        textSpeechRef.current = e?.value?.[0] ?? '';
        setStatus('receiving');
        statusRef.current = 'receiving';
      }
    }
  }, []);

  return {
    textSpeech,
    status,
    start,
    stop,
  };
}
