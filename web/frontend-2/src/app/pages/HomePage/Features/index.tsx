import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Table from 'app/components/Table';



const columns = [  {    Header: 'Name',    accessor: 'name',  },  {    Header: 'Age',    accessor: 'age',  },  {    Header: 'Country',    accessor: 'country',  },];

const data = [  {    name: 'John',    age: 25,    country: 'USA',  },  {    name: 'Alice',    age: 30,    country: 'Canada',  },  {    name: 'Bob',    age: 35,    country: 'Mexico',  },];


export function Features() {
  const { t } = useTranslation();

  return (
    <>
    <Table columns={columns} data={data}/>
    </>
  );
}

const Feature = styled.li`
  display: flex;
  margin: 6.25rem 0 6.25rem 2.25rem;

  .feature-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
  }
`;
const Content = styled.div`
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 6.25rem 0 0 0;
`;
