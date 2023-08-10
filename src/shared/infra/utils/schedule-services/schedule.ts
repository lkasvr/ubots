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

    pedingRequests.forEach(async (request) => {
      const updateRequest = new UpdateRequestBySchedule();
      const updatedRequest = await updateRequest.execute(request.id);
      console.log(updatedRequest);
    });
  });
}

export default scheduleService;
