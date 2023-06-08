import React from 'react';
import { ConnectionProps } from '../../components/Sidebar';
import styled from 'styled-components';
import { PURPLE } from '../../constants';
import SaleInfo from './SaleInfo';
import FadeIn from '../../components/FadeIn';
import TabTitle from 'components/TabTitle';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 350px;
  height: 100vh;
`;

const initialState = {
  coinToSell: 'SOL',
  coinToBuy: 'USDC',
  amountToSell: 0,
  amountToBuy: 0,
};

type State = typeof initialState;

type Action =
  | { type: 'setCoinToSell'; coin: string }
  | { type: 'setCoinToBuy'; coin: string }
  | { type: 'swap' }
  | { type: 'setAmountToSell'; amount: number }
  | { type: 'setAmountToBuy'; amount: number };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'setCoinToSell':
      return { ...state, coinToSell: action.coin };
    case 'setCoinToBuy':
      return { ...state, coinToBuy: action.coin };
    case 'swap':
      return {
        ...state,
        coinToSell: state.coinToBuy,
        coinToBuy: state.coinToSell,
        amountToSell: state.amountToBuy,
        amountToBuy: state.amountToSell,
      };
    case 'setAmountToSell':
      return { ...state, amountToSell: action.amount };
    case 'setAmountToBuy':
      return { ...state, amountToBuy: action.amount };
    default:
      throw new Error();
  }
}

const CoinInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
`;

const Input = styled.input`
  color: ${PURPLE};
  font-size: 2rem;
  background-color: transparent;
  max-width: 200px;
  border: none;
  // Remove arrows from number input
  -moz-appearance: div;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  // Remove border from number input when focused
  :focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const SwapButton = styled.button`
  background-color: ${PURPLE};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Trading = React.memo((props: ConnectionProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleInputChange = React.useCallback((e) => {
    dispatch({ type: 'setAmountToSell', amount: e.target.valueAsNumber });
  }, []);

  return (
    <FadeIn>
      <Body>
        <TabTitle>Trading</TabTitle>
        <>
          <CoinInput>
            <InputTitle>You Pay</InputTitle>
            <InputWrapper>
              <Input value={state.amountToSell} placeholder="0" onChange={handleInputChange} type="number" />
              <div>{state.coinToSell}</div>
            </InputWrapper>
          </CoinInput>
          <SwapButton onClick={() => dispatch({ type: 'swap' })}>Swap</SwapButton>
          <CoinInput>
            <InputTitle>You Receive</InputTitle>
            <InputWrapper>
              <Input value={state.amountToBuy} placeholder="0" onChange={handleInputChange} type="number" />
              <div>{state.coinToBuy}</div>
            </InputWrapper>
          </CoinInput>
          <SaleInfo />
        </>
      </Body>
    </FadeIn>
  );
});

export default Trading;
