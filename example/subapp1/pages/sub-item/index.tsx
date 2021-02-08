import React from 'react';
import style from './index.less';
import { Button } from 'antd';

const Child = () => {
  React.useEffect(() => {
    // throw 'Error 123';
  }, []);

  return <div className={style.red}>555</div>;
};

class Index1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aa: 11,
    };
  }

  componentDidMount() {
    this.setState({ aa: 22 });
    // setTimeout(() => {
    //   throw 'error';
    // }, 2000);
  }

  static getDerivedStateFromError(error) {
    //...
    console.log('%celelee test:', 'background:#000;color:#ff1', error);
    return {
      aa: 'err',
    };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log('%celelee test:', 'background:#000;color:#e12ff1', error, errorInfo);
  }
  render() {
    if (this.state.aa === 'err') return 'none';
    return (
      <div>
        <Button>ff</Button>
        {this.state.aa}
        <Child />
      </div>
    );
  }
}

export default Index1;
