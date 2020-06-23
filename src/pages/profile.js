import React, { Component } from 'react';
import { connect } from 'react-redux';
import registerUser from '../api/postProfile';
import axios from 'axios';
const States = [
  'Ångermanland',
  'Blekinge',
  'Bohuslän',
  'Dalarna',
  'Dalsland',
  'Gotland',
  'Gästrikland',
  'Halland',
  'Hälsingland',
  'Härjedalen',
  'Jämtland',
  'Lappland',
  'Medelpad',
  'Norrbotten',
  'Närke',
  'Öland',
  'Östergötland',
  'Skåne',
  'Småland',
  'Södermanland',
  'Uppland',
  'Värmland',
  'Västmanland',
  'Västerbotten',
  'Västergötland'
];

const Cities = [
  'Alingsås',
  'Åmål',
  'Ängelholm',
  'Arboga',
  'Arvika',
  'Askersund',
  'Avesta',
  'Boden',
  'Bollnäs',
  'Borgholm',
  'Borlänge',
  'Borås',
  'Djursholm',
  'Eksjö',
  'Enköping',
  'Eskilstuna',
  'Eslöv',
  'Fagersta',
  'Falkenberg',
  'Falköping',
  'Falsterbo',
  'Falun',
  'Filipstad',
  'Flen',
  'Gothenburg',
  'Gränna',
  'Gävle',
  'Hagfors',
  'Halmstad',
  'Haparanda',
  'Hedemora',
  'Helsingborg',
  'Hjo',
  'Hudiksvall',
  'Huskvarna',
  'Härnösand',
  'Hässleholm',
  'Höganäs',
  'Jönköping',
  'Kalmar',
  'Karlshamn',
  'Karlskoga',
  'Karlskrona',
  'Karlstad',
  'Katrineholm',
  'Kiruna',
  'Kramfors',
  'Kristianstad',
  'Kristinehamn',
  'Kumla',
  'Kungsbacka',
  'Kungälv',
  'Köping',
  'Laholm',
  'Landskrona',
  'Lidingö',
  'Lidköping',
  'Lindesberg',
  'Linköping',
  'Ljungby',
  'Ludvika',
  'Luleå',
  'Lund',
  'Lycksele',
  'Lysekil',
  'Malmö',
  'Mariefred',
  'Mariestad',
  'Marstrand',
  'Mjölby',
  'Motala',
  'Nacka',
  'Nora',
  'Norrköping',
  'Norrtälje',
  'Nybro',
  'Nyköping',
  'Nynäshamn',
  'Nässjö',
  'Örebro',
  'Öregrund',
  'Örnsköldsvik',
  'Oskarshamn',
  'Östersund',
  'Östhammar',
  'Oxelösund',
  'Piteå',
  'Ronneby',
  'Sala',
  'Sandviken',
  'Sigtuna',
  'Simrishamn',
  'Skanör',
  'Skanör med Falsterbo',
  'Skara',
  'Skellefteå',
  'Skänninge',
  'Skövde',
  'Sollefteå',
  'Solna',
  'Stockholm',
  'Strängnäs',
  'Strömstad',
  'Sundbyberg',
  'Sundsvall',
  'Säffle',
  'Säter',
  'Sävsjö',
  'Söderhamn',
  'Söderköping',
  'Södertälje',
  'Sölvesborg',
  'Tidaholm',
  'Torshälla',
  'Tranås',
  'Trelleborg',
  'Trollhättan',
  'Trosa',
  'Uddevalla',
  'Ulricehamn',
  'Umeå',
  'Uppsala',
  'Vadstena',
  'Varberg',
  'Vaxholm',
  'Vetlanda',
  'Vimmerby',
  'Visby',
  'Vänersborg',
  'Värnamo',
  'Västervik',
  'Västerås',
  'Växjö',
  'Ystad'
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      imageSrc: null
    };
  }

  // https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
  // register = () => {
  //   let { userId } = this.props;
  //   registerUser(userId).then((resp) => {
  //     console.log(JSON.stringify(resp));
  //   });
  // };

  getFile = (event) => {
    let { userId } = this.props;
    let fd = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', fd);

    let reader = new FileReader();
    let imageUrl = reader.readAsDataURL(fd);
    axios({
      method: 'post',
      url: 'http://localhost:3000/upload-profile-pic',
      data: formdata
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    reader.onloadend = (e) => {
      this.setState({
        imageSrc: [reader.result]
      });
    };
    console.log(this.state.imageSrc);
  };
  render() {
    return (
      <React.Fragment>
        <div className="background" />
        <section style={{ position: 'absolute' }}>
          <h1>your profile</h1>
          <form encType="multipart/form-data">
            <input type="file" name="profile_pic" onChange={this.getFile} />
          </form>
          <img
            style={{
              width: '200px',
              height: '200px',
              position: 'absolute',
              top: '20%',
              left: '20%'
            }}
            src={this.state.imageSrc}
          />
          {/* <a href="#" onClick={this.register}>
            register
          </a> */}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    Notifications: state.auth.Notifications,
    userId: state.auth.userId,
    isLoggedIn: state.auth.isLoggedIn,
    formErrors: state.auth.formErrors,
    formIsValid: state.auth.formIsValid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // dispatch,
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    login: (data) => {
      dispatch(loginUser(data));
    },
    handleErrors: (data) => {
      dispatch(_formErrors(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
