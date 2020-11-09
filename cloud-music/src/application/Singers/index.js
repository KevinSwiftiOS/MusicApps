import React, { Component, useEffect, useState } from 'react'
import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
import { alphaTypes, categoryTypes } from '../../api/config';
import { connect } from "react-redux";
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import Loading from '../../baseUI/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';

function Singers(props) {
  let [category, setCategory] = useState('');
  const { singerList, pageCount, enterLoading, pullUpLoading, pullDownLoading } = props;
  const { updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;
  let [alpha, setAlpha] = useState('');

  const singerListTOJS = singerList ? singerList.toJS() : [];

  useEffect(() => {
    getHotSingerDispatch();
  }, []);
  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  }

  let handleUpdateCateogry = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };
  const renderSingetList = () => {
    return (
      <List>
        {
          singerListTOJS.map((item, index) => {
            return (
              <ListItem key={item.accountId + "" + index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCateogry} oldVal={category}></Horizen>
        <Horizen list={alphaTypes} title={'首字母:'} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        {enterLoading ? <Loading></Loading> : null}
        <Scroll pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingetList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
      dispatch(changeEnterLoading(true));
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    // 滑动到底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));