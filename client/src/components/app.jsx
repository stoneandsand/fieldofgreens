 class App extends React.component{
  constructor(props) {
    super(props);
    this.state = {
      test: true;
    }
  }

  render() {
    return (
      <div>{console.log('testing')}

      </div>
      }
      }
    )
  }
}


can we see if this renders somehow? yes!
oh we need to reference the AppRender in our html
ah, i see. i was wondering how this would render without the reactdomrender