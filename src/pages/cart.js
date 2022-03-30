import React from 'react'

export default class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            cart: [], //dri local
            user: "", //dari session
            total: 0 //dari hasil perhitungan
        }
    }
    getUser = () => {
        let userName = sessionStorage.getItem("user")
        this.setState({
            user: userName
        })
    }
    getCart = () => {
        let tempCart = []
        let totalHarga = 0
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        tempCart.map(item => {
          return  totalHarga += (item.harga * item.jumlahBeli)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount = () => {
        this.getUser()
        this.getCart()
    }
    render(){
        return(
            <div className='container'>
                <div className='card col-12' mt-2>
                    <div className='card-header bg-primary text-white'>
                        Keranjang Belanja
                    </div>
                    <div className='card-body'>
                        <h5 className='text-grey'>
                            Nama Pengguna : {this.state.user}
                        </h5>
                        <table className='table table-bordered'>
                            <thead>
                                <th>Judul Buku</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total Harga</th>
                            </thead>
                            <tbody>
                                {this.state.cart.map((item, index) =>{
                                    return(
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>{item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>{item.harga * item.jumlahBeli}</td>
                                    </tr>
                                    )
                                    })}
                            </tbody>
                        </table>
                        <h5 className='text-info'>
                            Total Harga = {this.state.total}
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}