import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pdata } from '../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames';


enum ProfileSortValue { ProfileId = 'profileId', country = 'country', marketPlace = 'marketPlace', accountId = 'accountId' }
enum ProfileSortType { 'asc', 'desc' }

export const Profiles = () => {
  const [pData, setpData] = useState<Pdata[]>([])
  const [profileSortValue, setProfileSortValue] = useState<ProfileSortValue | ''>('');
  const [profileSortType, setProfileSortType] = useState<ProfileSortType | ''>('')
  const [profilePage, setProfilePage] = useState(0)
  const [profileQuery, setProfileQuery] = useState('')

  const { accountId } = useParams()

  useEffect(() => {

    if (!accountId) {
      return
    }

    axios.get(`https://65a7ca3a94c2c5762da78f5e.mockapi.io/asd/Profiles`)
      .then(response => {
        setpData(response.data.filter((item: Pdata) => +item.accountId === +accountId));
      })

  }, [])



  const handleSort = () => {
    if (!profileSortValue) {
      return pData
    }

    const copy = [...pData]

    copy.sort((a, b) => {

      switch (profileSortValue) {
        case ProfileSortValue.country:
          return (profileSortType === ProfileSortType.desc)
            ? b.country.localeCompare(a.country)
            : a.country.localeCompare(b.country)

        case ProfileSortValue.marketPlace:
          return (profileSortType === ProfileSortType.desc)
            ? b.marketplace.localeCompare(a.marketplace)
            : a.marketplace.localeCompare(b.marketplace)

        case ProfileSortValue.ProfileId:
          return (profileSortType === ProfileSortType.desc)
            ? (+b.profileId) - (+a.profileId)
            : (+a.profileId) - (+b.profileId)

        case ProfileSortValue.accountId:
          return (profileSortType === ProfileSortType.desc)
            ? (+b.accountId) - (+a.accountId)
            : (+a.accountId) - (+b.accountId)
        default:
          return 0
      }
    })
    return copy;
  }




  const dataToDisplay = handleSort().filter((item) => item.country.toLowerCase().includes(profileQuery.toLowerCase().trim()));
  const ITEMS = 5;

  function pagination() {
    const pages = [];
    const amount = Math.ceil(dataToDisplay.length / ITEMS);

    for (let i = 1; i <= amount; i += 1) {
      pages.push(i);
    }

    return pages;
  }
  const split = () => {
    const start = profilePage * ITEMS;
    const end = start + ITEMS;
    const display = dataToDisplay.slice(start, end);

    return display;
  };

  const checkedNext = profilePage === pagination()[pagination().length - 2];
  const checkedPrev = profilePage + 1 === pagination()[0];




  return (
    <>
      {
        pData.length <= 0 ? (
          <>

            <nav
             style={{ marginTop: '20px', marginLeft:'10px' }}
              className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a href="#" style={{ all: 'unset', cursor: 'pointer' }}>Accounts</a></li>
                <li style={{ color: '#3e8ed0' }} > Profiles</li>
              </ul>
            </nav>

            <p>no realted table</p>
          </>
        )

          : (<>


            <nav
              className="breadcrumb"
              aria-label="breadcrumbs"
              style={{ marginTop: '20px', marginLeft:'10px' }}
            >
              <ul>
                <li><a href="#" style={{ all: 'unset', cursor: 'pointer' }}>Accounts</a></li>
                <li style={{ color: '#3e8ed0' }}>Profiles</li>
              </ul>
            </nav>

            <div className='panel-block' style={{ maxWidth: '75%', margin: '0 auto', borderRadius: '10px', marginTop: '10px' }}>
              <p className="control has-icons-left">
                <input
                  className="input "
                  type="search"
                  placeholder="Country Filter"
                  onChange={(event) => {
                    setProfileQuery(event.target.value);
                    setProfilePage(0);
                  }}
                ></input>
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
              </p>
            </div>

            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
              style={{
                borderRadius: "10px", boxShadow: "5px 5px 19px black", margin: '20px auto', maxWidth: '75%'
              }}
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      accountId
                      <button
                        className='button is-rounded is-small is-light is-info ml-2'
                        onClick={() => {
                          setProfileSortValue(ProfileSortValue.accountId);
                          setProfileSortType(ProfileSortType.asc)

                          if (profileSortValue === ProfileSortValue.accountId && profileSortType === ProfileSortType.asc) {

                            setProfileSortType(ProfileSortType.desc)
                          }

                          if (profileSortValue === ProfileSortValue.accountId && profileSortType === ProfileSortType.desc) {
                            setProfileSortValue('')
                            setProfileSortType('')
                          }
                        }

                        }
                      >
                        <span className="icon is-small">
                          <i className="fas fa-sort" />
                        </span>
                      </button>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      country
                      <button
                        className='button is-rounded is-small is-light is-info ml-2'
                        onClick={() => {
                          setProfileSortValue(ProfileSortValue.country);
                          setProfileSortType(ProfileSortType.asc)

                          if (profileSortValue === ProfileSortValue.country && profileSortType === ProfileSortType.asc) {
                            setProfileSortType(ProfileSortType.desc)
                          }

                          if (profileSortValue === ProfileSortValue.country && profileSortType === ProfileSortType.desc) {
                            setProfileSortValue('')
                            setProfileSortType('')
                          }
                        }}

                      >
                        <span className="icon is-small">
                          <i className="fas fa-sort" />
                        </span>
                      </button>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      marketPlace
                      <button
                        className='button is-rounded is-small is-light is-info ml-2'
                        onClick={() => {
                          setProfileSortValue(ProfileSortValue.marketPlace);
                          setProfileSortType(ProfileSortType.asc)

                          if (profileSortValue === ProfileSortValue.marketPlace && profileSortType === ProfileSortType.asc) {
                            setProfileSortType(ProfileSortType.desc)
                          }

                          if (profileSortValue === ProfileSortValue.marketPlace && profileSortType === ProfileSortType.desc) {
                            setProfileSortValue('')
                            setProfileSortType('')
                          }
                        }}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-sort" />
                        </span>
                      </button>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ProfileId
                      <button
                        className='button is-rounded is-small is-light is-info ml-2'
                        onClick={() => {
                          setProfileSortValue(ProfileSortValue.ProfileId);
                          setProfileSortType(ProfileSortType.asc)

                          if (profileSortValue === ProfileSortValue.ProfileId && profileSortType === ProfileSortType.asc) {
                            setProfileSortType(ProfileSortType.desc)
                          }

                          if (profileSortValue === ProfileSortValue.ProfileId && profileSortType === ProfileSortType.desc) {
                            setProfileSortValue('')
                            setProfileSortType('')
                          }
                        }}
                      >
                        <span className="icon is-small ">
                          <i className="fas fa-sort" />
                        </span>
                      </button>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>

                {pData &&
                  split().map((row) => (
                    <tr >
                      <td><Link to={`/Campaigns/${row.profileId}`} >{row.accountId} </Link></td>
                      <td><Link to={`/Campaigns/${row.profileId}`} >{row.country}</Link></td>
                      <td><Link to={`/Campaigns/${row.profileId}`} >{row.marketplace}</Link></td>
                      <td><Link to={`/Campaigns/${row.profileId}`} >{row.profileId.toString()}</Link></td>
                    </tr>
                  ))}




              </tbody>
            </table>

            {split().length > 1 && (
              <nav className="pagination is-centered mb-2" role="navigation" aria-label="pagination">
                <button
                  className='button pagination-previous'
                  onClick={() => {
                    setProfilePage((prevPage: number) => prevPage - 1);
                  }}
                  disabled={checkedPrev}
                  style={{ width: '100px', marginLeft: '150px' }}
                >
                  Previous
                </button>

                <button
                  className='button pagination-next '
                  onClick={() => {
                    setProfilePage((nextPage: number) => nextPage + 1);
                  }}
                  disabled={checkedNext}
                  style={{ width: '100px', marginRight: '150px' }}
                >
                  Next
                </button>



                <ul className="pagination-list">
                  {pagination().map((button, i) => (
                    <li><button
                      className={classNames("pagination-link button", { 'is-info': profilePage === i })}
                      aria-label="Goto page 45"
                      onClick={() => {
                        setProfilePage(i);

                      }}
                    >
                      {i + 1}
                    </button></li>
                  ))}


                </ul>

              </nav>

            )}
          </>)
      }


    </>
  )
}
