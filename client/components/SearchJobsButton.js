import React from 'react';
import JobLoader from './JobLoader';
import { updateJobList } from '../mutations';
import { graphql, compose } from 'react-apollo';
import { browserHistory } from 'react-router';
import Loader from 'react-loader-spinner';
import SearchIcon from 'react-icons/lib/md/search';
import styles from '../styles/SubmitButton.css';

class SearchJobsButton extends React.Component {
  async onLoad(jobs){
    await this.props.updateJobList({
      variables: {
        jobs
      }
    });
    browserHistory.push('/results');
  }
  render(){
    return (
      <JobLoader
        onLoad={this.onLoad.bind(this)}
        startingIndex={0}
        render={({getButtonProps,isLoading})=>{
          return (
            <button
              {...getButtonProps}
              disabled={isLoading}
              className={styles.button} 
            >
            <div className={styles.content}>
              {isLoading?(
                  <Loader
                    type='ThreeDots'
                    color="#ffffff"
                    height="35"	
                    width="35"
                  />
              ):<div>
                  <p className={styles.text}>
                  Search
                  </p>
                  <div className={styles.icon}>
                    <SearchIcon/>
                  </div>
                </div>
              }
              </div>
            </button>
          );
        }}
      />
    );
  }

}

export default compose(
  graphql(updateJobList,{
    name: 'updateJobList'
  })
)(SearchJobsButton);