import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Cdata } from '../../types'
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';



enum CampaignSortValue { ProfileId = 'profileId', clicks = 'clicks', cost = 'cost', date = 'date', campaignId = 'campaignId' }
enum CampaignSortType { 'asc', 'desc' }




export const Campaigns = () => {
  const [cData, setcData] = useState<Cdata[]>([])
  const [campaignSortValue, setCampaingSortValue] = useState<CampaignSortValue | ''>('');
  const [campaignSortType, setCampaignSortType] = useState<CampaignSortType | ''>('')
  const [campaignPage, setCampaignPage] = useState(0)
  const [campaignQuery, setCampaignQuery] = useState('')


  const { profileId } = useParams()

  useEffect(() => {
    if (!profileId) {
      return
    }

    axios.get(`https://65a7ca3a94c2c5762da78f5e.mockapi.io/asd/Campaigns`)
      .then(response => {
        console.log(profileId)
        setcData(response.data.filter((item: Cdata) => +item.profileId === +profileId));
      })

  }, [])

  const handleSort = () => {
    if (!campaignSortValue) {
      return cData
    }

    const copy = [...cData]

    copy.sort((a, b) => {

      switch (campaignSortValue) {
        case CampaignSortValue.clicks:
          return (campaignSortType === CampaignSortType.desc)
            ? b.clicks - a.clicks
            : a.clicks - b.clicks

        case CampaignSortValue.cost:
          return (campaignSortType === CampaignSortType.desc)
            ? (+b.cost) - (+a.cost)
            : +(a.cost) - (+b.cost)

        case CampaignSortValue.ProfileId:
          return (campaignSortType === CampaignSortType.desc)
            ? (+b.profileId) - (+a.profileId)
            : (+a.profileId) - (+b.profileId)

        case CampaignSortValue.campaignId:
          return (campaignSortType === CampaignSortType.desc)
            ? (+b.campaignId) - (+a.campaignId)
            : (+a.campaignId) - (+b.campaignId)
        case CampaignSortValue.date:
          return (campaignSortType === CampaignSortType.desc)
            ? b.date.localeCompare(a.date)
            : a.date.localeCompare(b.date)

        default:
          return 0
      }
    })
    return copy;
  }


  const dataToDisplay = handleSort().filter((item) => item.date.toLowerCase().startsWith(campaignQuery.toLowerCase().trim()));



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



    const start = campaignPage * ITEMS;
    const end = start + ITEMS;
    console.log(`start-${start} end-${end} length-${dataToDisplay.length}`)
    const display = dataToDisplay.slice(start, end);



    return display;




  };

  const checkedNext = campaignPage === pagination()[pagination().length - 2];
  const checkedPrev = campaignPage + 1 === pagination()[0];

  const move = useNavigate();

  const handleMovement = () => {
    move(-1);
  };




  return (
    <>
      {cData.length <= 0 ? (
        <>
          <nav
            className="breadcrumb"
            aria-label="breadcrumbs"
            style={{ marginTop: '20px', marginLeft:'10px' }}
          >
            <ul>
              <li><a href="#" style={{ all: 'unset' }}>Accounts</a></li>
              <li
                style={{ cursor: 'pointer' }}
                onClick={handleMovement}
              >
                Profiles
              </li>
              <li style={{ color: '#3e8ed0' }}>Campaigns</li>
            </ul>
          </nav>
          <p>no realted table</p>
        </>)
        : (<>


          <nav
            className="breadcrumb"
            aria-label="breadcrumbs"
            style={{ marginTop: '20px', marginLeft:'10px' }}
          >
            <ul>
              <li><a href="#" style={{ all: 'unset', cursor: 'pointer' }}>Accounts</a></li>
              <li
                style={{ cursor: 'pointer' }}
                onClick={handleMovement}
              >
                Profiles
              </li>
              <li style={{ color: '#3e8ed0' }}>Campaigns</li>
            </ul>
          </nav>


          <div className='panel-block' style={{ maxWidth: '75%', margin: '0 auto', borderRadius: '10px', marginTop: '10px' }}>
            <p className="control has-icons-left">
              <input
                className="input "
                type="search"
                placeholder="Date Filter"
                onChange={(event) => {
                  setCampaignQuery(event.target.value)
                  setCampaignPage(0);
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
                    campaignId

                    <button
                      className='button is-rounded is-small is-light is-info ml-2'
                      onClick={() => {
                        setCampaingSortValue(CampaignSortValue.campaignId);
                        setCampaignSortType(CampaignSortType.asc)

                        if (campaignSortValue === CampaignSortValue.campaignId && campaignSortType === CampaignSortType.asc) {

                          setCampaignSortType(CampaignSortType.desc)
                        }

                        if (campaignSortValue === CampaignSortValue.campaignId && campaignSortType === CampaignSortType.desc) {
                          setCampaingSortValue('')
                          setCampaignSortType('')
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
                    clicks
                    <button
                      className='button is-rounded is-small is-light is-info ml-2'
                      onClick={() => {
                        setCampaingSortValue(CampaignSortValue.clicks);
                        setCampaignSortType(CampaignSortType.asc)

                        if (campaignSortValue === CampaignSortValue.clicks && campaignSortType === CampaignSortType.asc) {

                          setCampaignSortType(CampaignSortType.desc)
                        }

                        if (campaignSortValue === CampaignSortValue.clicks && campaignSortType === CampaignSortType.desc) {
                          setCampaingSortValue('')
                          setCampaignSortType('')
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
                    cost
                    <button
                      className='button is-rounded is-small is-light is-info ml-2'
                      onClick={() => {
                        setCampaingSortValue(CampaignSortValue.cost);
                        setCampaignSortType(CampaignSortType.asc)

                        if (campaignSortValue === CampaignSortValue.cost && campaignSortType === CampaignSortType.asc) {

                          setCampaignSortType(CampaignSortType.desc)
                        }

                        if (campaignSortValue === CampaignSortValue.cost && campaignSortType === CampaignSortType.desc) {
                          setCampaingSortValue('')
                          setCampaignSortType('')
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
                    date
                    <button
                      className='button is-rounded is-small is-light is-info ml-2'
                      onClick={() => {
                        setCampaingSortValue(CampaignSortValue.date);
                        setCampaignSortType(CampaignSortType.asc)

                        if (campaignSortValue === CampaignSortValue.date && campaignSortType === CampaignSortType.asc) {

                          setCampaignSortType(CampaignSortType.desc)
                        }

                        if (campaignSortValue === CampaignSortValue.date && campaignSortType === CampaignSortType.desc) {
                          setCampaingSortValue('')
                          setCampaignSortType('')
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
                    profileId
                    <button
                      className='button is-rounded is-small is-light is-info ml-2'
                      onClick={() => {
                        setCampaingSortValue(CampaignSortValue.ProfileId);
                        setCampaignSortType(CampaignSortType.asc)

                        if (campaignSortValue === CampaignSortValue.ProfileId && campaignSortType === CampaignSortType.asc) {

                          setCampaignSortType(CampaignSortType.desc)
                        }

                        if (campaignSortValue === CampaignSortValue.ProfileId && campaignSortType === CampaignSortType.desc) {
                          setCampaingSortValue('')
                          setCampaignSortType('')
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
              </tr>
            </thead>

            <tbody>

              {
                split().map((row) => (
                  <tr >
                    <td>
                      {row.campaignId}
                    </td>
                    <td>{row.clicks.toString()}</td>
                    <td>{row.cost.toString()}</td>
                    <td>{row.date.toString()}</td>
                    <td>{row.profileId.toString()}</td>
                  </tr>
                ))}




            </tbody>
            <tr style={{ height: "39px" }}>

            </tr>
          </table >

          {split().length > 1 && (
            <nav className="pagination is-centered mb-2" role="navigation" aria-label="pagination">
              <button
                className='button pagination-previous'
                onClick={() => {
                  setCampaignPage((prevPage: number) => prevPage - 1);
                }}
                disabled={checkedPrev}
                style={{ width: '100px', marginLeft: '150px' }}
              >
                Previous
              </button>

              <button
                className='button pagination-next '
                onClick={() => {
                  setCampaignPage((nextPage: number) => nextPage + 1);
                }}
                disabled={checkedNext}
                style={{ width: '100px', marginRight: '150px' }}
              >
                Next
              </button>

              <ul className="pagination-list">
                {pagination().map((_, i) => (
                  <li><button
                    className={classNames("pagination-link button", { 'is-info': campaignPage === i })}
                    aria-label="Goto page 45"
                    onClick={() => {
                      setCampaignPage(i);

                    }}
                  >
                    {i + 1}
                  </button></li>
                ))}


              </ul>
            </nav>
          )}
        </>
        )}
    </>
  )
}

