import IfirestoreUser from '../Interfaces/IfirestoreUser';

export default class FirestoreUser implements IfirestoreUser{
  email: string;
  hasGivenPermission: boolean;
  name: string;
}
