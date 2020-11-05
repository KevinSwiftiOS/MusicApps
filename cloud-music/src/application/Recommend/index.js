import React, { Component, useEffect } from 'react'
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import { Content } from './style';
import  Scroll  from '../../components/scroll';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import Loading from '../../baseUI/loading/index';
import { forceCheck } from 'react-lazyload';
function Recommend(props) {
  const { bannerList, recommendList,enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  
  useEffect(() => {
    console.log(bannerList);
    if(!bannerList.size) {
      getBannerDataDispatch();
    }
    if(!recommendList.size) {
      getRecommendListDataDispatch();
    }
  },[]);


  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
     {enterLoading ?  <Loading></Loading> : null }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Recommend));