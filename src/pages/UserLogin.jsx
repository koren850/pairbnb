import { Switch, Route } from 'react-router'
import { connect } from 'react-redux';
import {LogIn} from '../cmps/LogIn'
import {SignUp} from '../cmps/SignUp'
import { signingUp,signingIn } from '../store/userAction';

 function _UserLogin({signingUp,signingIn,history}) {
 return (<section style={{marginBlockStart:'80px'}}>
     <Switch>
 <Route component={()=><LogIn signingIn={signingIn} history={history}/>} path='/user/login'/>
 <Route component={()=><SignUp signingUp={signingUp} history={history}/>} path='/user/signup'/>
     </Switch>
 </section>)
}

function mapStateToProps({ userModule }) {
  return {
      user: userModule.user,
  }
}
const mapDispatchToProps = {
  signingUp,
  signingIn
};

export const UserLogin = connect(mapStateToProps, mapDispatchToProps)(_UserLogin)
