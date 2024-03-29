import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import ItemAddForm from './components/add-item';

import './index.css';

export default class App extends Component{

  maxId = 1;

  state ={
    todoData : [
      this.creatTodoItem('Drink Coffe'),
      this.creatTodoItem('Make awesome App'),
      this.creatTodoItem('Sleep')
    ],
    term: '',
    filter: 'all'
  };

  creatTodoItem(label) {
    return{
      label,
      important:false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) =>{
    this.setState( ({ todoData }) => {
         
      const idx = todoData.findIndex((el) => el.id === id);
         
      const newArray = [
          ...todoData.slice(0,idx),
          ...todoData.slice(idx + 1)
        ];
       
        return{
          todoData: newArray
        };
    });
  };

  addItem = (text) => {
    const newItem = this.creatTodoItem(text);

    this.setState(({todoData}) => {
      
      
      const newArr = [
        ...todoData,
        newItem
      ];
      return{
        todoData: newArr
       
      }
    })
  }

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem,
    [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]

   
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })

  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onSearchChange = (term) =>{
    this.setState({term});
  }

  

  search(items, term){
    if (term.length === 0){
      return items
    }
    return items.filter((item) =>{
      return item.label.indexOf(term) > -1;
    })
  }

  filter(items, filter){
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item)=> !item.done);
      case 'done':
        return items.filter((item)=>item.done);
      default:
      return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  };


 render(){
   const {todoData, term, filter} =this.state;
   const visibleItems =this.filter( this.search(todoData, term), filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  return (

    
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel 
        onSearchChange = {this.onSearchChange}/>
        <ItemStatusFilter filter={filter}
        onFilterChange={this.onFilterChange}
        />
      </div>

      <TodoList todos={visibleItems} 
      onDeleted ={ this.deleteItem}
      onToggleImportant = {this.onToggleImportant}
      onToggleDone = {this.onToggleDone}/>

      <ItemAddForm addItem = {this.addItem} />
    </div>
  );
 }

  
};

ReactDOM.render(<App />,
  document.getElementById('root'));