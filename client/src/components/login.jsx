import axios from 'axios';
const Lock = require('../../Auth/Auth.js').Lock;

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {

    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount () {
    this.props.auth.handleAuth();
    Lock.on('authenticated,' (authInfo) => {
      console.log('authStatus: ' + authInfo)

      if (!authInfo.accessToken) {return};

      Lock.getUserInfo(authInfo.accessToken. (err, profile) => {
        console.log('err', err, 'profile', profile);

        axios.post('http://localhost:1130/api/signup, profile')
             .then( (success) => {
               console.log('succeeded logging ' + success);
               window.location.reload();

             .catch( (err) => {
              console.log('err message: ' + err);
             })
             })
      })
    });

    Lock.on('authorization_error', (err) => {
      console.log('auth err: ' + err);
    });
    Lock.show();
  }

  login () {
    Lock.show();
  }

  render() {
    const { Authed } = this.props.auth;

    return (
      )
  }
}
