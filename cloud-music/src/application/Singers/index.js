import React, { Component, useState } from 'react'
import Horizen from '../../baseUI/horizen-item';
import { alphaTypes, categoryTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers(props) {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  
  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  }

  let handleUpdateCateogry = (val) => {
    setCategory(val);
  }

   return (
    <NavContainer>
          <Horizen list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCateogry} oldVal={category}></Horizen>
          <Horizen list={alphaTypes} title={'首字母:'} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizen>
    </NavContainer>

  )
}

export default React.memo(Singers);