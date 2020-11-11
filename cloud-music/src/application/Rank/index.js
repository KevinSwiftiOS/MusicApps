import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import { filterIndex } from '../../api/utils';
import Loading from '../../baseUI/loading/index';
import Scroll from '../../baseUI/scroll/index';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
function Rank(props) {
  const { rankList, loading } = props;
  const { getRankListDataDispatch } = props;

  useEffect(() => {
    getRankListDataDispatch();
  }, []);

  const list = rankList ? rankList.toJS() : [];
  let globalStartIndex = filterIndex(list);
  let officialList = list.slice(0, globalStartIndex);
  let globalList = list.slice(globalStartIndex);
  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const enterDetail = () => {

  };

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  
  let displayStyle = loading ? {'display': 'none'} : {'display': ''};

 return (
  <Container>
    <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          { renderRankList (officialList) }
        <h1 className="global" style={displayStyle}> 全球榜 </h1>
          { renderRankList (globalList, true) }
        { loading ? <Loading></Loading> : null }
      </div>
    </Scroll> 
    {/* {renderRoutes (props.route.routes)} */}
  </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(actionTypes.getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));