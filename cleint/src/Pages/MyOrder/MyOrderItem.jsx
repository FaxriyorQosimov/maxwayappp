import React from 'react'
import UnstyledTable from './TableMyOrderItem'


import '../../styles/myOrder.css'
function MyOrderItem() {
    return (
        <div className="my_order_item">
            <div className="container">
                <div className="my_order_item_wrapper">
                    <h1>Информация о заказе №105234</h1>
                    <div className="my_order_item_table">
                        <div className="my_order_item_table_card">
                            <UnstyledTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrderItem
