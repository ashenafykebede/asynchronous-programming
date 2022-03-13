import { labeledLogger } from '../../../lib/labeled-logger.js';
import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log, error } = labeledLogger();

/**
 *
 */
const findGeoCoordinates = async (ids = []) => { 
  const responsePromises = ids.map(nextId => fetchUserById(nextId));  
  log("responsePromises:",responsePromises);
  const responses = await Promise.all(responsePromises); 
  log("responses:",responses);

  for (const res of responses) { 
    if (!res.ok) 
    { throw new Error(`${res.status}: ${res.statusText}`); } 
    } 

    const userPromises = responses.map((response) => response.json());
     const users = await Promise.all(userPromises); 
     const coordinates = users.map((user)=>({
       lat: user.address.geo.lat,
       lng:user.address.geo.lng
     }));
     return coordinates; }; 

// --- --- tests --- ---

describe('findGeoCoordinates: returns an array of user coordinates', () => {
  it('finds coordinates for 6', async () => {
    const actual = await findGeoCoordinates([6]);
    expect(actual).toEqual([{ lat: '-71.4197', lng: '71.7478' }]);
  });
  it('finds coordinates for 8, 6, 4', async () => {
    const actual = await findGeoCoordinates([8, 6, 4]);
    expect(actual).toEqual([
      { lat: '-14.3990', lng: '-120.7677' },
      { lat: '-71.4197', lng: '71.7478' },
      { lat: '29.4572', lng: '-164.2990' },
    ]);
  });
  it('finds coordinates for 4, 7, 5, 6', async () => {
    const actual = await findGeoCoordinates([4, 7, 5, 6]);
    expect(actual).toEqual([
      { lat: '29.4572', lng: '-164.2990' },
      { lat: '24.8918', lng: '21.8984' },
      { lat: '-31.8129', lng: '62.5342' },
      { lat: '-71.4197', lng: '71.7478' },
    ]);
  });
  it('finds coordinates for no one', async () => {
    const actual = await findGeoCoordinates([]);
    expect(actual).toEqual([]);
  });
});

console.log('= = = =  the call stack is empty  = = = =');
