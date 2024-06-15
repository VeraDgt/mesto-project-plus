import NotFoundError from "../error/not-found-error";

const noPage = () => {
  NotFoundError('Запрашиваемый ресурс не найден');
};

export default noPage;