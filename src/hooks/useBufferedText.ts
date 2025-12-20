import {useState, useEffect} from 'react';
import {useAppDispatch} from 'stores';
import GPTTextSlice from 'stores/GPTTextSlice';

const useBufferedText = (initialText = '') => {
  // const [buffer, setBuffer] = useState('');
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   // Thiết lập interval để cập nhật text từ buffer
  //   const interval = setInterval(() => {
  //     if (buffer) {
  //       dispatch(GPTTextSlice.actions.setTextGPT(buffer));
  //       setBuffer('');
  //     }
  //   }, 500); // Điều chỉnh khoảng thời gian nếu cần
  //   // Dọn dẹp
  //   return () => clearInterval(interval);
  // }, [buffer]); // Phụ thuộc vào buffer, useEffect này sẽ chạy lại khi buffer thay đổi
  // return setBuffer;
};

export default useBufferedText;
