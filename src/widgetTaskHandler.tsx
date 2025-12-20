import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import AsyncStorageHelper, {StorageType} from 'helpers/AsyncStorageHelper';
import TextToSpeechHelper from 'helpers/TextToSpeechHelper';
import React from 'react';
import {Linking} from 'react-native';
import {
  WidgetTaskHandlerProps,
  requestWidgetUpdate,
} from 'react-native-android-widget';
import store, {RootState} from 'stores';
// import store from 'stores';
import Api from 'apis/Api';
import {sendMessageByChatGPT, sendMessageWidget} from 'stores/ChatSlice';
import GPTSlice from 'stores/GPTSlice';
import {getDeviceVoiceCode} from 'stores/TransSlice';
import Constants from 'utils/Constants';
import {RecorderWidget} from './widget/RecorderWidget';
import {ConfigFirestore} from 'apis/FirestoreApi';
import CommonHelper from 'helpers/CommonHelper';
import {removeUndefinedFields, VERTEX_GOOGLE_REGION} from 'utils/Common';
import FirebaseAnalyticHelper from 'helpers/FirebaseAnalyticHelper';
import {RecorderWidgetLight} from 'widget/RecorderWidgetLight';
import FirebaseAppCheckHelper from 'helpers/FirebaseAppCheckHelper';
import {unwrapResult} from '@reduxjs/toolkit';
const listLangs: LangType[] = require('json/language.json');

const nameToWidget = {
  Recorder: RecorderWidget,
  RecorderLight: RecorderWidgetLight,
};

let curentTextGpt = '' as string | undefined;
let isGPTTyping = false;

export const getSurrentTextGpt = () => {
  return curentTextGpt;
};

let soundFile = undefined as string | undefined;

function onSpeechResults(e: any) {
  console.log('onSpeechResults', e.value);
  const text = e.value && e.value.length > 0 ? e.value[0] : '';
  if (!text) {
    requestWidgetUpdateDarkLight({status: 4});
    return;
  }
  Voice.removeAllListeners();
  Voice.stop();
  Voice.destroy();
  onSendMessage(text);
}
function onSpeechError(e: any) {
  requestWidgetUpdateDarkLight({status: 0});
}

async function onSpeechPartialResults(e: SpeechResultsEvent) {
  console.log('onSpeechPartialResults', e);
  const text = e.value && e.value.length > 0 ? e.value[0] : '';
  if (text) {
    requestWidgetUpdateDarkLight({status: 2, text});
  }
}

const startRecording = async (userStorage?: StorageType) => {
  FirebaseAnalyticHelper.logEvent('ClickWidgetRecording');

  TextToSpeechHelper.stopSound();
  Voice.removeAllListeners();
  store.dispatch(GPTSlice.actions.setIsChatSpeaking(false));
  // store.dispatch(GPTSlice.actions.setIsWidgetGPTTyping(false));
  isGPTTyping = false;

  const userInfo = userStorage?.getProerty('userInfo') as UserInfoType;

  const permission = userStorage?.getProerty('recordingPermission') as
    | boolean
    | undefined;
  if (!userInfo || userInfo.isGuest) {
    Linking.openURL('heyai://login');
    return;
  }

  if (!permission) {
    Linking.openURL('heyai://main/home?requestPermissionRecording=true');
    return;
  }

  if (userInfo && permission) {
    const threadSetting = userStorage?.getProerty(
      'threadSetting',
    ) as ThreadSettingType;
    let langCodeVoice = '' as string | undefined | null;
    const setting = threadSetting?.[userInfo?.id!];
    const transStore = await AsyncStorageHelper('trans').get();
    const langCodeSave = transStore?.getProerty('langCode');
    if (setting?.langCode) {
      langCodeVoice = setting?.langCode;
    } else if (langCodeSave) {
      langCodeVoice = listLangs.find(item =>
        item.code?.startsWith(langCodeSave),
      )?.code;
    } else {
      langCodeVoice = getDeviceVoiceCode().code;
    }
    if (langCodeVoice) {
      requestWidgetUpdateDarkLight({status: 1});
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.start(langCodeVoice);

      return true;
    }
  }
  return false;
};

const stopRecording = async () => {
  requestWidgetUpdateDarkLight({status: 0});
  TextToSpeechHelper.stopSound();
  store.dispatch(GPTSlice.actions.setIsChatSpeaking(false));
  isGPTTyping = false;
  const isRecording = await Voice.isRecognizing();
  if (isRecording) {
    Voice.removeAllListeners();
    Voice.stop();
    Voice.destroy();
  }
};

// const getIsGPTTyping = async () => {
//   // const gptStorage = await AsyncStorageHelper('gpt').get();
//   return (store.getState() as RootState).gpt.isGPTTyping;
// };

const getIsSpeaking = async () => {
  // const gptStorage = await AsyncStorageHelper('gpt').get();
  return (store.getState() as RootState).gpt.isChatSpeaking;
};

const onSendMessage = async (text?: string, userStorage?: StorageType) => {
  try {
    // const isGPTTyping = await getIsGPTTyping();
    // if (!isGPTTyping) {
    const isRecording = await Voice.isRecognizing();
    if (isRecording) {
      Voice.removeAllListeners();
      Voice.stop();
      Voice.destroy();
    }
    // store.dispatch(GPTSlice.actions.setIsGPTTyping(true));
    isGPTTyping = true;
    // isSending = true;
    if (!userStorage) {
      userStorage = await AsyncStorageHelper('user').get();
    }
    const modelStorage = await AsyncStorageHelper('model').get();
    const defaultModel = modelStorage?.getProerty('defaultModel') as
      | ModelDataType
      | undefined;
    const audioModel = modelStorage?.getProerty('audioModel') as
      | ModelDataType
      | undefined;
    const selectedVoice = modelStorage?.getProerty('selectedVoice') as
      | string
      | undefined;
    if (text) {
      // const rootState = store.getState();
      requestWidgetUpdateDarkLight({status: 3});
      // const rootState = store.getState();
      const userInfo = userStorage?.getProerty('userInfo') as
        | UserInfoType
        | undefined;

      if (userInfo?.id && !userInfo.isGuest && defaultModel) {
        const thread = unwrapResult(
          await store.dispatch(sendMessageWidget(text)),
        );
        const threadSetting = userStorage?.getProerty(
          'threadSetting',
        ) as ThreadSettingType;
        let langCodeVoice = '' as string | undefined | null;
        const setting = threadSetting?.[userInfo?.id!];
        // const configData = await ConfigFirestore().getConfigsData();
        const appCheckToken = await FirebaseAppCheckHelper.getAppCheckToken();

        // const region = CommonHelper.getRandomElement(VERTEX_GOOGLE_REGION);
        try {
          const params = {
            provider: 'google',
            model: defaultModel.model,
            messages: [{role: 'user', content: [{text, type: 'text'}]}],
            stream: false,
            config: {
              maxTokens: 1024,
              temperature: 1,
              topP: 1,
              topK: 32,
            },
          };
          const result = await Api().generateText(params, appCheckToken ?? '');
          // const result = await Api().chatGeminiV2(
          //   [{role: 'user', parts: [{text}]}],
          //   configData?.geminiKey,
          //   configData.gemini_model,
          // );
          curentTextGpt = result.text;
        } catch (err) {
          console.log('--- Err Api().chatGemini', err);
        }

        if (curentTextGpt && isGPTTyping && thread?.threadId) {
          store.dispatch(
            sendMessageByChatGPT({
              threadId: thread?.threadId,
              message: {
                message: curentTextGpt,
                messageReply: text,
                nameReply: userInfo.name!,
                idReply: userInfo.id,
                createBy: Constants.CREATE_BY_GEMINI,
              },
            }),
          );
          requestWidgetUpdateDarkLight({
            status: 4,
            text: curentTextGpt,
            isMute: false,
          });
          store.dispatch(GPTSlice.actions.setIsChatSpeaking(true));

          const transStore = await AsyncStorageHelper('trans').get();
          const langCodeSave = transStore?.getProerty('langCode');
          if (setting?.langCode) {
            langCodeVoice = setting?.langCode;
          } else if (langCodeSave) {
            langCodeVoice = listLangs.find(item =>
              item.code?.startsWith(langCodeSave),
            )?.code;
          } else {
            langCodeVoice = getDeviceVoiceCode().code;
          }
          const memberType = userStorage?.getProerty('memberType') as number;
          // const configData = await ConfigFirestore().getConfigsData();

          if (langCodeVoice && audioModel) {
            if (memberType != 0 && selectedVoice) {
              soundFile = await TextToSpeechHelper.getSoundSpeech(
                curentTextGpt,
                selectedVoice,
                audioModel.model,
              );
            } else {
              await TextToSpeechHelper.checkTtsAvalibale(langCodeVoice);
              soundFile = undefined;
            }
          }
          const isSpeaking = await getIsSpeaking();
          if (isSpeaking) {
            try {
              await TextToSpeechHelper.playSound(soundFile, curentTextGpt);
            } catch {}
            requestWidgetUpdateDarkLight({
              status: 4,
              text: curentTextGpt,
              isMute: true,
            });
          } else {
            requestWidgetUpdateDarkLight({
              status: 4,
              text: curentTextGpt,
              isMute: true,
            });
          }
        } else {
          requestWidgetUpdateDarkLight({
            status: 0,
          });
        }
      } else {
        Linking.openURL('heyai://login');
      }
    }
    // }
  } catch (err) {
    console.log('--- widget err', err);
  }
};

const onStartSpeeching = async (text: string) => {
  store.dispatch(GPTSlice.actions.setIsChatSpeaking(true));

  requestWidgetUpdateDarkLight({
    status: 4,
    isMute: false,
    text,
  });

  try {
    await TextToSpeechHelper.playSound(soundFile, text);
  } catch {}
  store.dispatch(GPTSlice.actions.setIsChatSpeaking(false));
  requestWidgetUpdateDarkLight({
    status: 4,
    isMute: true,
    text,
  });
};

const onStopSpeeching = (text: string) => {
  store.dispatch(GPTSlice.actions.setIsChatSpeaking(false));
  TextToSpeechHelper.stopSound();

  requestWidgetUpdateDarkLight({status: 4, isMute: true, text});
};

const onShowMessageInApp = (userStorage?: StorageType) => {
  const userInfo = userStorage?.getProerty('userInfo') as
    | UserInfoType
    | undefined;
  if (userInfo && !userInfo.isGuest) {
    Linking.openURL(`heyai://main/home?threadId=${userInfo.id}`);
  } else {
    Linking.openURL('heyai://login');
  }
};

export default async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];
  // const store = require('stores').default as StoreType;
  // const rootState = store.getState();
  const userStorage = await AsyncStorageHelper('user').get();
  // const userInfo = rootState.user.userInfo;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      // console.log('WIDGET_ADDED');
      FirebaseAnalyticHelper.logEvent('WidgetAdded', {
        name: widgetInfo.widgetName,
      });
      props.renderWidget(<Widget status={0} />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget status={0} />);
      break;

    case 'WIDGET_RESIZED':
      break;

    case 'WIDGET_DELETED':
      break;

    case 'WIDGET_CLICK':
      if (props.clickAction == 'START_RECORDING') {
        startRecording(userStorage);
      } else if (props.clickAction == 'STOP_RECORDING') {
        stopRecording();
      } else if (props.clickAction == 'SEND_MESSAGE') {
        onSendMessage(props.clickActionData?.text as string, userStorage);
      } else if (props.clickAction == 'START_SPEECHING') {
        onStartSpeeching(props.clickActionData?.text as string);
      } else if (props.clickAction == 'STOP_SPEECHING') {
        onStopSpeeching(props.clickActionData?.text as string);
      } else if (props.clickAction == 'SHOW_MESSAGE') {
        onShowMessageInApp(userStorage);
      }
      // Not needed for now
      break;

    default:
      break;
  }
}

export const requestWidgetUpdateDarkLight = (parans: {
  status: number;
  isMute?: boolean;
  text?: string;
}) => {
  requestWidgetUpdate({
    widgetName: Constants.RECORDER_WIDGET,
    renderWidget: () => (
      <RecorderWidget
        status={parans.status}
        isMute={parans.isMute}
        text={parans.text}
      />
    ),
  });
  requestWidgetUpdate({
    widgetName: Constants.RECORDER_WIDGET_LIGHT,
    renderWidget: () => (
      <RecorderWidgetLight
        status={parans.status}
        isMute={parans.isMute}
        text={parans.text}
      />
    ),
  });
};
