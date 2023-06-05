import { UserCreate, UserEdit } from 'src/models/user';

export const convertUserToFormData = (user: UserCreate): FormData => {
  const formData = new FormData();

  if (user.name) {
    formData.append('name', user.name);
  }

  if (user.lastName) {
    formData.append('lastName', user.lastName);
  }

  if (user.email) {
    formData.append('email', user.email);
  }

  if (user.password) {
    formData.append('password', user.password);
  }

  if (user.birthDate) {
    formData.append('birthDate', formatDate(user.birthDate));
  }

  if (user.image) {
    formData.append('image', user.image);
  }

  if (user.role) {
    formData.append('role', user.role);
  }

  formData.append('state', user.state.toString());

  return formData;
};

export const convertUserEditToFormData = (user: UserEdit): FormData => {
  const formData = new FormData();

  if (user.name) {
    formData.append('name', user.name);
  }

  if (user.lastName) {
    formData.append('lastName', user.lastName);
  }

  if (user.email) {
    formData.append('email', user.email);
  }

  if (user.birthDate) {
    formData.append('birthDate', formatDate(user.birthDate));
  }

  if (user.image) {
    formData.append('image', user.image);
  }

  if (user.role) {
    formData.append('role', user.role);
  }

  return formData;
};

const formatDate = (date: Date) => {
  date = new Date(date);

  const format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(date);
  return `${year}-${month}-${day}`;
};
