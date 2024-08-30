// Больше не используется, т.к.
// объединили классовый компонент с контейнерным в UsersContainer


class UsersAPIComponent extends React.Component {

  componentDidMount() {
    console.log('Component mounted')
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
    .then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  onPageChanged = (pageNumber) =>{
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
    .then(response => {
      this.props.setUsers(response.data.items)
    })
  } 

  render() {
    return (
     <Users 
        total = {this.props.totalUsersCount}
        pageSize = {this.props.pageSize}
        users = {this.props.users}
        toggle = {this.props.toggleFollow}
        onPageChanged = {this.onPageChanged}
        currentPage = {this.props.currentPage}
      />
    )
  }
}

export default UsersAPIComponent
// props.callback()


/*
  constructor(props) {
    super(props)
   // this.getUsers = this.getUsers.bind(this)   
  }



props.setUsers( [   
          {id: 1, photo: photo1, followed: true, fullName: 'Shprot', status: "Where's my food, dude?", location: {city: 'Minsk', country: 'Belarus'}},
          {id: 2, photo: photo2, followed: false, fullName: 'Bantik', status: "Meow", location: {city:'Moscow', country: 'Russia'}},
          {id: 3,  photo: photo3, followed: true, fullName: 'Pusha', status: 'More fish!', location: {city:'St.Petersburg', country: 'Russia'}}
        ] )

*/