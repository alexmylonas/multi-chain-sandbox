import { Connection } from '@solana/web3.js';

import { TLog } from '../types';

const POLLING_INTERVAL = 1000; // one second
const MAX_POLLS = 30;

/**
 * Polls for transaction signature statuses
 * @param   {String}     signature  a transaction signature
 * @param   {Connection} connection an RPC connection
 * @param   {Function}   createLog  a function to create log
 * @returns
 */
const pollSignatureStatus = async (
  signature: string,
  connection: Connection,
  createLog: (log: TLog) => void
): Promise<void> => {
  let count = 0;

  const interval = setInterval(async () => {
    const { value } = await connection.getSignatureStatus(signature);
    const confirmationStatus = value?.confirmationStatus;

    if (confirmationStatus) {
      const hasReachedSufficientCommitment = confirmationStatus === 'confirmed' || confirmationStatus === 'finalized';

      createLog({
        status: hasReachedSufficientCommitment ? 'success' : 'info',
        method: 'signAndSendTransaction',
        message: `Transaction: ${signature}`,
        messageTwo: `Status: ${confirmationStatus}`,
      });

      if (hasReachedSufficientCommitment) {
        clearInterval(interval);
        return;
      }
    } else {
      createLog({
        status: 'warning',
        method: 'signAndSendTransaction',
        message: `Transaction: ${signature}`,
        messageTwo: 'Status: Unable to retrieve confirmation status for this 1 second cycle.',
      });
    }

    count++;
  }, POLLING_INTERVAL);

  // Failed to confirm transaction in time
  if (count === MAX_POLLS) {
    clearInterval(interval);
    createLog({
      status: 'error',
      method: 'signAndSendTransaction',
      message: `Transaction: ${signature}`,
      messageTwo: `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
    });
  }
};

export default pollSignatureStatus;
