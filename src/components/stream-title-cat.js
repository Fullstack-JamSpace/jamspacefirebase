import React, { Fragment, Component } from 'react';
import { Form, } from 'semantic-ui-react';
import '../css/stream.css'
import { getStreamer } from '../utils';
import db from '../firebase';

export default class StreamTitleCat extends Component {
  constructor(){
    super()
    this.state = {
      streamTitle: '',
      streamCategory: '',
      streamer: {},
    }
  }

  async componentDidMount(){
    const displayName = this.props.displayName;
    const streamer = await getStreamer(displayName);
    this.setState({ streamer });
  }

  handleChange = async (e, { name, value }) => {
    await this.setState({ [name]: value })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const { streamTitle, streamCategory, streamer } = this.state
    try {
      const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
      await streamerRef.update({...streamer, streamTitle, streamCategory})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { isStreamer } = this.props;
    const { streamTitle, streamCategory, streamer } = this.state
    const options = [
      {key: 1, text: 'Single Performer', value: 'Single Performer'},
      {key: 2, text: 'Band', value: 'Band'},
      {key: 3, text: 'Production', value: 'Production'},
      {key: 4, text: 'Lessons', value: 'Lessons'}
    ]

    return (
      isStreamer ?
      <div className='flex stream-header'>
        <img className='streamer-thumb' src={streamer.imageUrl} alt=''/>
        <Form id='title-category-form' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input id='title-input' placeholder='Stream Title' name='streamTitle' value={streamTitle} onChange={this.handleChange} />
            <Form.Dropdown
              id='category-dropdown'
              placeholder='Stream Category'
              name='streamCategory'
              value={streamCategory}
              onChange={this.handleChange}
              options={options}
            />
            <Form.Button id='update-btn' content='Update' />
          </Form.Group>
        </Form>
      </div>
      : streamer.streamTitle && streamer.streamCategory ?
      <div className='flex stream-header'>
        <img className='streamer-thumb' src={streamer.imageUrl} alt=''/>
        <h3 className='stream-title'>{`${streamer.streamTitle}`}</h3>
        <p className='stream-category'>{`(${streamer.streamCategory})`}</p>
      </div>
        : null
    )
  }
}