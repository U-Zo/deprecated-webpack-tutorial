import names from './names';

const ulElement = document.createElement('ul');

names.forEach((person) => {
  const nameEle = document.createElement('li');
  nameEle.append(`${person.name}`);

  ulElement.appendChild(nameEle);
});

const bodyElement = document.querySelector('body');
bodyElement.appendChild(ulElement);
