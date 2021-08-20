import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  qiankunScript() {
    return `
    // const render = () => Promise.resolve();

    (global => {
        global.nextAppList = global.nextAppList || []

        global['next-app' + global.nextAppList.length] = {
            bootstrap: function() {
                return Promise.resolve();
            },
            mount: function(props, b) {
              global.imgCache = props.store
              // global.topWin = props.topWin
              global.__fatherDom__ = props.container
              // return render($);
            },
            unmount: function() {
                console.log('home unmount');
                return Promise.resolve();
            }
        };

        global.nextAppList.push(global['next-app' + global.nextAppList.length])
    })(window);
    `;
  }

  render() {
    return (
      <html>
        <Head></Head>
        <body>
          {/* Main 其实就是App */}
          <Main />
          <NextScript />
        </body>

        <script dangerouslySetInnerHTML={{ __html: this.qiankunScript() }}></script>
      </html>
    );
  }
}
