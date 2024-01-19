import axios from 'axios';
import { useEffect, useState } from 'react';
import { Data } from '../../types';
import { Link } from 'react-router-dom'
import classNames from 'classnames';


enum AccountSortValue { accountId = 'accountId', authToken = 'authToken', creationDate = 'creationDate', Email = 'Email' }
enum AccountSortType { 'asc', 'desc' }


export const Accounts = () => {

  const [data, setData] = useState<Data[]>([])
  const [accountSortValue, setAccountSortValue] = useState<AccountSortValue | ''>('');
  const [accountSortType, setAccountSortType] = useState<AccountSortType | ''>('')
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get(`https://65a7ca3a94c2c5762da78f5e.mockapi.io/asd/Accounts`)
      .then(response => {
        setData(response.data);
      })

  }, [])

  const handleSort = () => {
    if (!accountSortValue) {
      return data
    }

    const copy = [...data]

    copy.sort((a, b) => {

      switch (accountSortValue) {
        case AccountSortValue.Email:
          return (accountSortType === AccountSortType.desc)
            ? b.email.localeCompare(a.email)
            : a.email.localeCompare(b.email)

        case AccountSortValue.authToken:
          return (accountSortType === AccountSortType.desc)
            ? b.authToken.localeCompare(a.authToken)
            : a.authToken.localeCompare(b.authToken)

        case AccountSortValue.creationDate:
          return (accountSortType === AccountSortType.desc)
            ? b.creationDate.localeCompare(a.creationDate)
            : a.creationDate.localeCompare(b.creationDate)

        case AccountSortValue.accountId:
          return (accountSortType === AccountSortType.desc)
            ? (+b.accountId) - (+a.accountId)
            : (+a.accountId) - (+b.accountId)
        default:
          return 0
      }
    })
    return copy;
  }


  const dataToDisplay = handleSort().filter((item) => item.email.toLowerCase().includes(query));
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
    const start = page * ITEMS;
    const end = start + ITEMS;
    const display = dataToDisplay.slice(start, end);

    return display;
  };

  const checkedNext = page === pagination()[pagination().length - 2];
  const checkedPrev = page + 1 === pagination()[0];

  return (
    <>

    

      <div className='panel-block' style={{ maxWidth: '75%', margin: '0 auto', borderRadius: '10px', marginTop: '10px' }}>
        <p className="control has-icons-left">
          <input
            className="input "
            type="search"
            placeholder="Email Filter"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
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
                <button className='button is-rounded is-small is-light is-info ml-2'

                  onClick={() => {
                    setAccountSortValue(AccountSortValue.accountId);
                    setAccountSortType(AccountSortType.asc)

                    if (accountSortValue === AccountSortValue.accountId && accountSortType === AccountSortType.asc) {

                      setAccountSortType(AccountSortType.desc)
                    }

                    if (accountSortValue === AccountSortValue.accountId && accountSortType === AccountSortType.desc) {
                      setAccountSortValue('')
                      setAccountSortType('')
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
                authToken
                <button
                  className='button is-rounded is-small is-light is-info ml-2'

                  onClick={() => {
                    setAccountSortValue(AccountSortValue.authToken);
                    setAccountSortType(AccountSortType.asc)

                    if (accountSortValue === AccountSortValue.authToken && accountSortType === AccountSortType.asc) {
                      setAccountSortType(AccountSortType.desc)
                    }

                    if (accountSortValue === AccountSortValue.authToken && accountSortType === AccountSortType.desc) {
                      setAccountSortValue('')
                      setAccountSortType('')
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
                creationDate
                <button
                  className='button is-rounded is-small is-light is-info ml-2'

                  onClick={() => {
                    setAccountSortValue(AccountSortValue.creationDate);
                    setAccountSortType(AccountSortType.asc)

                    if (accountSortValue === AccountSortValue.creationDate && accountSortType === AccountSortType.asc) {

                      setAccountSortType(AccountSortType.desc)
                    }

                    if (accountSortValue === AccountSortValue.creationDate && accountSortType === AccountSortType.desc) {
                      setAccountSortValue('')
                      setAccountSortType('')
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
                Email
                <button
                  className='button is-rounded is-small is-light is-info ml-2'
                  onClick={() => {
                    setAccountSortValue(AccountSortValue.Email);
                    setAccountSortType(AccountSortType.asc)

                    if (accountSortValue === AccountSortValue.Email && accountSortType === AccountSortType.asc) {

                      setAccountSortType(AccountSortType.desc)
                    }

                    if (accountSortValue === AccountSortValue.Email && accountSortType === AccountSortType.desc) {
                      setAccountSortValue('')
                      setAccountSortType('')
                    }
                  }}
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
          {data &&
            split().map((row) => (
              <tr >
                <td><Link to={`/Profiles/${row.accountId}`} >{row.accountId}</Link></td>
                <td><Link to={`/Profiles/${row.accountId}`}>{row.authToken}</Link></td>
                <td><Link to={`/Profiles/${row.accountId}`}>{row.creationDate}</Link></td>
                <td><Link to={`/Profiles/${row.accountId}`}>{row.email}</Link></td>
              </tr>
            ))}
        </tbody>
        <tr style={{ height: "20px" }}>

        </tr>
      </table >
      {split().length > 1 && (
        <nav className="pagination is-centered mb-2" role="navigation" aria-label="pagination">
          <button
            className='button pagination-previous'
            onClick={() => {
              setPage((prevPage: number) => prevPage - 1);
            }}
            disabled={checkedPrev}
            style={{ width: '100px', marginLeft: '150px' }}
          >
            Previous
          </button>

          <button
            className='button pagination-next '
            onClick={() => {
              setPage((nextPage: number) => nextPage + 1);
            }}
            disabled={checkedNext}
            style={{ width: '100px', marginRight: '150px' }}
          >
            Next
          </button>

          <ul className="pagination-list">
            {pagination().map((_, i) => (
              <li><button
                className={classNames("pagination-link button", { 'is-info': page === i })}
                aria-label="Goto page 45"
                onClick={() => {
                  setPage(i);

                }}
              >
                {i + 1}
              </button></li>
            ))}


          </ul>
        </nav>

      )}

    </>
  )
}
