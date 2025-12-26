import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ModalCenter from 'components/modal/ModalCenter';
import CustomText from 'components/text/CustomText';
import GradientButton from 'components/button/GradientButton';

type ModalReportProps = {
  isVisible: boolean;
  onCancel: () => void;
  onReport: () => void;
  onBlock: () => void;
};

const ModalReport = (props: ModalReportProps) => {
  const { isVisible, onCancel, onReport, onBlock } = props;
  return (
    <ModalCenter isVisible={isVisible} onCancel={onCancel}>
      <View style={styles.modalContent}>
        <Image
          source={require('assets/img_report.png')}
          style={styles.modalIcon}
        />

        <GradientButton
          text="Báo xấu"
          onPress={onReport}
          style={styles.modalSaveButton}
        />

        <TouchableOpacity
          onPress={onBlock}
          style={styles.modalDiscardButton}
          activeOpacity={0.7}
        >
          <CustomText style={styles.modalDiscardText}>
            Chặn người này
          </CustomText>
        </TouchableOpacity>
      </View>
    </ModalCenter>
  );
};

export default ModalReport;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalIcon: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 44,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#969696',
    textAlign: 'center',
  },
  modalSaveButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  modalSaveButtonGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDiscardText: {
    fontSize: 16,
    color: '#0786FF',
    fontWeight: '600',
  },
  modalDiscardButton: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F5FAFF',
    borderRadius: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
});
