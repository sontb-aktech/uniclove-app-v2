import ModalCenter from 'components/modal/ModalCenter';
import CustomText from 'components/text/CustomText';
import useCommon from 'hooks/useCommon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const ModalSurvey = (props: { isVisible: boolean; onCancel: () => void }) => {
  const common = useCommon();
  return (
    <ModalCenter
      isVisible={props.isVisible}
      onCancel={props.onCancel}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <CustomText
        fontStyleType="title-semibold"
        style={{ textAlign: 'center', alignSelf: 'center' }}
      >
        Hãy cho đối phương biết thêm về bạn
      </CustomText>
      <CustomText colorType="subtitleText">
        Điều này giúp chúng tôi gợi ý những người phù hợp gần bạn.
      </CustomText>
    </ModalCenter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalSurvey;
