import { Author } from '@services/news/types';

function getAuthors(list: Author[]) {
  const names = [];
  for (let index = 0; index < list.length; index += 1) {
    const person = list[index];
    const fullname: string[] = [];
    if (person.firstname) {
      fullname.push(person.firstname);
    }
    if (person.middlename) {
      fullname.push(person.middlename);
    }
    if (person.lastname) {
      fullname.push(person.lastname);
    }

    names.push(fullname.join(' '));
  }

  return names.join(', ');
}

export default getAuthors;
