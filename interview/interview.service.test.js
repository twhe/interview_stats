const rp = require('request-promise')
const { Interview } = require('./interview.schema.js')
const interviewService = require('./interview.service.js')

const interviewEvent = {
  _id: '5e619e8c4a59a982be9d34ba',
  lonlat: [
    -0.698567,
    52.305549
  ],
  type: 'Settlement',
  createdAt: '2020-03-06T00:51:24.191Z',
  updatedAt: '2020-03-06T00:51:24.191Z',
  __v: 0
}

const multipleInterviewEvents = [
  {
    _id: '5e619e8c4a59a982be9d34ba',
    lonlat: [
      -0.698567,
      52.305549
    ],
    type: 'Settlement',
    createdAt: '2020-03-06T00:51:24.191Z',
    updatedAt: '2020-03-06T00:51:24.191Z',
    __v: 0
  },
  {
    _id: '5e619e0e6f9d64829fd8b9a8',
    lonlat: [
      -0.131017,
      51.487154
    ],
    type: 'Settlement',
    createdAt: '2020-03-06T00:49:18.219Z',
    updatedAt: '2020-03-06T00:49:18.219Z',
    __v: 0
  }
]

const postCodeLookupResult = {
  status: 200,
  result: {
    postcode: 'SW1V 3SN',
    quality: 1,
    eastings: 529863,
    northings: 178123,
    country: 'England',
    nhs_ha: 'London',
    longitude: -0.131017,
    latitude: 51.487154,
    european_electoral_region: 'London',
    primary_care_trust: 'Westminster',
    region: 'London',
    lsoa: 'Westminster 024C',
    msoa: 'Westminster 024',
    incode: '3SN',
    outcode: 'SW1V',
    parliamentary_constituency: 'Cities of London and Westminster',
    admin_district: 'Westminster',
    parish: 'Westminster, unparished area',
    admin_county: null,
    admin_ward: 'Tachbrook',
    ced: null,
    ccg: 'NHS Central London (Westminster)',
    nuts: 'Westminster',
    codes: {
      admin_district: 'E09000033',
      admin_county: 'E99999999',
      admin_ward: 'E05000645',
      parish: 'E43000236',
      parliamentary_constituency: 'E14000639',
      ccg: 'E38000031',
      ccg_id: '09A',
      ced: 'E99999999',
      nuts: 'UKI32'
    }
  }
}

jest.spyOn(Interview, 'find').mockReturnValue(Promise.resolve(multipleInterviewEvents))
jest.spyOn(Interview, 'findOneAndUpdate').mockReturnValue(Promise.resolve(interviewEvent))
jest.mock('request-promise')

test('Can submit interview event', async () => {
  rp.mockResolvedValue(postCodeLookupResult)
  const saved = await interviewService.submitInterviewEvent('123', 'Settlement', 'M50 3UB')
  expect(saved).toHaveProperty('lonlat', [-0.698567, 52.305549])
})

test('Can fetch all events', async () => {
  const allEvents = await interviewService.getAllInterviewEvents()
  expect(allEvents[0]).toHaveProperty('nearestOffice', 'Birmingham')
})
