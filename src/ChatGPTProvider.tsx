import ChatGPTRoot from 'components/ChatGPTRoot';
import TextToSpeechHelper from 'helpers/TextToSpeechHelper';
import React, {createContext, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';

export type PostMessageParams = {
  messages: MessageType[];
  model: ModelDataType;
  thread: ThreadType;
  isVoiceToVoice?: boolean;
  setting?: {[key: string]: ModelSettingType};
  dualModel?: ModelDataType;
  settingDualModel?: {[key: string]: ModelSettingType};
  webSearch?: boolean;
  reuqireChangeThreadName?: boolean;
  listImgBase64?: string[];
};

export type ChatGPTHelperType = {
  postStreamedMessage: (input: PostMessageParams) => void;
  onChatGPTStop: () => void;
  onStopSpeeching: () => void;
};

export const ChatGPTPContext = createContext<ChatGPTHelperType>({
  postStreamedMessage: (input: PostMessageParams) => {},
  onChatGPTStop: () => {},
  onStopSpeeching: () => {},
  // itemSound: undefined as Sound | undefined,
  // setItemSound: (sound?: Sound) => {},
});

const ChatGPTProvider = (props: {children: any}) => {
  // const [message, setMessage] = useState('');
  const chatGPTHelperRef = useRef<ChatGPTHelperType>(null);

  useEffect(() => {
    TextToSpeechHelper.setupPlayer();
    // const listener = TextToSpeechHelper.trackPlayerGlobalListener();
    // return () => listener.remove();
  }, []);
  return (
    <ChatGPTPContext.Provider
      value={{
        onChatGPTStop: () => {
          chatGPTHelperRef.current?.onChatGPTStop();
        },
        postStreamedMessage: (input: PostMessageParams) => {
          chatGPTHelperRef.current?.postStreamedMessage(input);
        },
        onStopSpeeching: () => {
          chatGPTHelperRef.current?.onStopSpeeching();
        },
      }}>
      <ChatGPTRoot ref={chatGPTHelperRef} />
      {props.children}
    </ChatGPTPContext.Provider>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default ChatGPTProvider;
