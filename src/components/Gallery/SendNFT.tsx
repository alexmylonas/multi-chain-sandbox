import React from 'react';
import Button from '../Button';
import styled, { keyframes } from 'styled-components';
import { PURPLE, REACT_GRAY } from '../../constants';
import useEthereum from 'hooks/useEthereum';
import { SupportedEVMChainIds } from 'types';

const AddressInput = styled.input`
  width: 100%;
  background-color: ${REACT_GRAY};
  border: 2px solid ${PURPLE};
  border-radius: 0.3rem;
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const fadeInY = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  animation: ${fadeInY} 0.5s ease-in-out;
`;

const SendNFT = ({ tokenId, contractAddress }: { tokenId: string; contractAddress: string }) => {
  const [inSentMode, setInSentMode] = React.useState(false);
  const [receiverAddress, setReceiverAddress] = React.useState('');
  const { address, transferToken } = useEthereum();

  const onSend = () => {
    transferToken({
      chainId: SupportedEVMChainIds.EthereumGoerli,
      contractAddress,
      tokenId,
      fromAddress: address,
      transferToAddress: receiverAddress,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  };

  const onCancel = () => {
    setInSentMode(false);
    setReceiverAddress('');
  };

  if (!inSentMode) {
    return (
      <Button data-test-id="transfer" className="secondary" onClick={() => setInSentMode(true)}>
        Transfer
      </Button>
    );
  }

  return (
    <>
      <AddressInput
        value={receiverAddress}
        onChange={onChange}
        placeholder="Enter the address you want to sent it to"
      />
      <Actions>
        <Button data-test-id="transfer" className="secondary" onClick={onSend}>
          Send
        </Button>
        <Button data-test-id="cancel" className="primary" onClick={onCancel}>
          Cancel
        </Button>
      </Actions>
    </>
  );
};

export default SendNFT;
