import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {123 + 456}
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
