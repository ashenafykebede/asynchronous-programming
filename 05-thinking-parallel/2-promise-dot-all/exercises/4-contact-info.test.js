import { labeledLogger } from '../../../lib/labeled-logger.js';
import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log, error } = labeledLogger();

/**
 *
 */
const contactDetails = async (ids = []) => {
  try{
     // responses promise array
  const responsePromises = ids.map(id=>fetchUserById(id));

// wait till responses promises resolve
const responses = await Promise.all(responsePromises);

//parse the response promses into user detail object promises
const userPromises = responses.map((user)=>user.json());

// wait till user detail promises resolve
const users = await Promise.all(userPromises);

//loop through each response to check if it is ok or not
//if ok push user details , otherwise push error message 
let usersContactDetails = [];
for (const res of responses){
  if(!res.ok){
    usersContactDetails.push(`${res.status}: ${res.statusText}`);
  }else{
    const user = users[responses.indexOf(res)];
    usersContactDetails.push(`${user.id}. ${user.email}, ${user.phone}, ${user.website}`);
  }
}
return usersContactDetails;

  } catch (err){
     error(err);
  }
};

// --- --- tests --- ---

describe('contactDetails: returns an array of user contact details', () => {
  describe('when fetching only users that exist', () => {
    it('finds contact details for user 5', async () => {
      const actual = await contactDetails([5]);
      expect(actual).toEqual([
        '5. Lucio_Hettinger@annie.ca, (254)954-1289, demarco.info',
      ]);
    });
    it('finds contact details for users 6, 1, 2', async () => {
      const actual = await contactDetails([6, 1, 2]);
      expect(actual).toEqual([
        '6. Karley_Dach@jasper.info, 1-477-935-8478 x6430, ola.org',
        '1. Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
        '2. Shanna@melissa.tv, 010-692-6593 x09125, anastasia.net',
      ]);
    });
    it('finds contact details for all odd users', async () => {
      const actual = await contactDetails([1, 3, 5, 7, 9]);
      expect(actual).toEqual([
        '1. Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
        '3. Nathan@yesenia.net, 1-463-123-4447, ramiro.info',
        '5. Lucio_Hettinger@annie.ca, (254)954-1289, demarco.info',
        '7. Telly.Hoeger@billy.biz, 210.067.6132, elvis.io',
        '9. Chaim_McDermott@dana.io, (775)976-6794 x41206, conrad.com',
      ]);
    });
  });
  describe('when fetching some users that do not exist', () => {
    it('user 0', async () => {
      const actual = await contactDetails([0]);
      expect(actual).toEqual(['404: Not Found: there is no user with id 0']);
    });
    it('users -11, 0, 11', async () => {
      const actual = await contactDetails([-11, 0, 11]);
      expect(actual).toEqual([
        '404: Not Found: there is no user with id -11',
        '404: Not Found: there is no user with id 0',
        '404: Not Found: there is no user with id 11',
      ]);
    });
    it('users  0, 1, 2', async () => {
      const actual = await contactDetails([0, 1, 2]);
      expect(actual).toEqual([
        '404: Not Found: there is no user with id 0',
        '1. Sincere@april.biz, 1-770-736-8031 x56442, hildegard.org',
        '2. Shanna@melissa.tv, 010-692-6593 x09125, anastasia.net',
      ]);
    });
  });
});

console.log('=== === === the callstack is empty === === ===');
