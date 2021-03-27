export const filterTasksByState = (tasks, idState) => {
  return tasks.filter(task => (task.idEstado === idState));
}

export const filterTasksByDate = (tasks, date) => {
  return tasks.filter(task => (new Date(task.fecha).getDate() === date.getDate()));
}

export const filterTasksByLaterDate = (tasks, today, tomorrow) => {
  return tasks.filter(task =>
    (new Date(task.fecha).getDate() !== today.getDate() && new Date(task.fecha).getDate() !== tomorrow.getDate())
  );
}

export const filterTasksByDateDelayed = (tasks, today) => {
  return tasks.filter(task => (new Date(task.fecha).getDate() < today.getDate() && new Date(task.fecha).getMonth() <= today.getMonth() && new Date(task.fecha).getFullYear() <= today.getFullYear()));
}
