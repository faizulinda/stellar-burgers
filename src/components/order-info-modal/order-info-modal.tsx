import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';

type TOrderInfoModalProps = {
  onClose: () => void;
};

export const OrderInfoModal: FC<TOrderInfoModalProps> = ({ onClose }) => {
  const { number } = useParams();

  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
