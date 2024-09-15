import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './Style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent';
function HomePage() {
  const arr = ['Golden Health', 'Canxi & Vitamin D', 'Collagen', 'Dầu cá Omega-3', 'Giảm cân', 'Glucosamine', 'Tăng chiều cao', 'Trắng da', 'Vitamin & khoáng chất', 'Góc sức khỏe']
  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div className='body' style={{width: '100%', backgroundColor: '#efefef'}}>
        <div id="container" style={{ backgroundColor: '#efefef', height: '1500px', width: '1270px', margin: '0 auto' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore textButton='Xem Thêm' type='outline' styleButton={{
              border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)',
              width: '240px', height: '38px', borderRadius: '4px'
            }}
              styleTextButton={{ fontWeight: '500' }}
            />
          </div>
        </div>
      </div>
    </>

  );
}

export default HomePage;