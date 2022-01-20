import * as React from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx'
import { commonData } from '../HomePage/Logics.jsx';



function createData(id, name, calories, fat, allPrice, address, paymentMethods, allestPrice) {
  return {id, name, calories, fat, allPrice, address, paymentMethods };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 120, 'Адрес', 'asdfas'),
  createData(2, 'Donut', 452, 25.0, 120, 'Способ оплаты', 'asdfas'),
  createData('','','','','', 'Общая сумма', 'asdfas'),
//   createData(1, 'Eclair', 262, 16.0),
//   createData(1, 'Frozen yoghurt', 159, 6.0),
//   createData(1, 'Gingerbread', 356, 16.0),
//   createData(1, 'Honeycomb', 408, 3.2),
//   createData(1, 'Ice cream sandwich', 237, 9.0),
//   createData(1, 'Jelly Bean', 375, 0.0),
//   createData(1, 'KitKat', 518, 26.0),
//   createData(1, 'Lollipop', 392, 0.2),
//   createData(1, 'Marshmallow', 318, 0),
//   createData(1, 'Nougat', 360, 19.0),
//   createData(1, 'Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 16px;
    font-weight: 500
  }

  th {
    background-color: #ddd;
  }
`;
const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export default function UnstyledTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [commonDat, setCommonDat] = React.useState('')
  const [generalPric, setGeneralPrice] = React.useState('')
  const [changeFoods, setChangeFoods] = React.useState([]);
  console.log(generalPric);
  console.log(commonDat);
  React.useEffect(() => {
      const load = async () => {
          onSnapshot(collection(db, 'commonData'),  (snapshot) => 
          setCommonDat(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));

          onSnapshot(collection(db, "generalPrice"),  snapshot => 
          setGeneralPrice(snapshot.docs.map(  (doc)  => ({...doc.data(), defaultId: doc.id})))
          )

          onSnapshot(collection(db, 'changeFoods'),  (snapshot) => 
          setChangeFoods(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));
      }
      load()
  },[])

  return (
    <Root>
      <table style={{ minWidth: 300 }} aria-label="custom pagination table">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Общая сумма</th>
          </tr>
        </thead>
        <tbody>
          {/* {(rowsPerPage > 0 
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => ( */}
          {
              commonDat && 
              <>
                    {
                        changeFoods && changeFoods.map((food, index) =>
                            
                            <tr >
                                <td>{index + 1}</td>
                                <td>{food.title}</td>
                                <td  align="right">
                                    {food.staticCeil}
                                </td>
                                <td  align="right">
                                    {food.count}
                                </td>
                                <td>{food.ceil}</td>
                            </tr>
                            
                            )
                    }
                <tr >
                    <td></td>
                    <td>Доставка</td>
                    <td>9 000 сум</td>
                    <td  align="right">
                        1
                    </td>
                    <td  align="right">
                        9 000 сум
                    </td>
                </tr>
              
              </>
          }
          {/* ))} */}

        </tbody>
      </table>

      <table style={{ minWidth: 300, marginTop: '30px' }} aria-label="custom pagination table">
        <tbody>
          {/* {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => ( */}
          {
              commonDat && 
              <>
                <tr>
                    <td>Адрес</td>
                    <td>{commonDat[0].address}</td>
                </tr>
                <tr>
                    <td>Способ оплаты</td>
                    <td>{commonDat[0].paymentType}</td>
                </tr>
                <tr>
                    <td>Общая сумма</td>
                    <td>{(commonDat[0].shippingMethods === 'Доставка') ? 
                    (generalPric && generalPric[0].generalPrice+9+' 000 сум') : 
                    (generalPric && generalPric[0].generalPrice+' 000 сум')}</td>
                </tr>
              </>
          }
          {/* ))} */}

        </tbody>
      </table>
    </Root>
  );
}