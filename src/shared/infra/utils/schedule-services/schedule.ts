import ListRequestService from '@modules/request/services/ListRequestService';
import UpdateRequestBySchedule from '@modules/request/services/UpdateRequestBySchedule';
import AppError from '@shared/errors/AppError';
import schedule from 'node-schedule'

const scheduleService = () => {
  return schedule.scheduleJob('* * * * *', async () => {
    const listRequestService = new ListRequestService();

    const requests = await listRequestService.execute();

    if (requests instanceof AppError || requests.length === 0) return console.warn(requests);

    const pedingRequests = requests.filter((request) => (request.status === 'PENDENTE'));

    if (pedingRequests.length === 0)
      return console.log(`[PING] ${new Date().toUTCString()} Schedule Services - Não há solicitações pendentes.`);

    let i = 0;
    for (const pedingRequest of pedingRequests) {
      if (i === 2) return;
      const updateRequest = new UpdateRequestBySchedule();
      const updatedRequest = await updateRequest.execute(pedingRequest.id);
      console.log(updatedRequest);
      i++;
    };
  });
}

export default scheduleService;
