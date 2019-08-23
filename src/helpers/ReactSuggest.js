import React, { Fragment } from 'react';
import { getRequest } from './apiLexicon';
import { SwalFire } from './swalFire';

export default class ReactSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      suggestions: [],
      text: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    this.listMaker(this.props.url);
  }

  listMaker = (url) => {
    if(url === '/categories') {
      getRequest(url)
        .then(res => {
          if(res.data.status !== 200) {
            SwalFire(res.data.message, 'warning')
          }
          else {
            if(res.data.docs.length > 0) {
              res.data.docs.map(category => this.items.push(category.title));
            }
            else SwalFire('Não há categoria cadastrada.', 'warning');
          }
        }).catch(err => SwalFire(err, 'error'));

    } else if(url === '/providers') {
      getRequest(url)
        .then(res => {
          if(res.data.status === 200) {
            res.data.docs.map(provider => this.items.push(provider.name))
          }
          else {
            SwalFire(res.data.message, 'warning');
          };
        }).catch(err => SwalFire(err, 'error'));

      } else if(url === '/merchandise') {
        getRequest(url)
          .then(res => {
            if(res.data.status === 200) {
              res.docs.map(merchan => this.items.push(merchan.category));
            }
            else SwalFire(res.data.message, 'warning');
          });
        } else if(url === '/customers') {
          getRequest(url)
            .then(res => {
              if(res.status === 200) {
                res.data.docs.map(customer => {
                  this.items.push(customer.name);
                });
              }
              else SwalFire('Erro ao carregar clientes.', 'warning');
            });
          } else if(url === '/rentals') {
            getRequest(url)
              .then(res => {
                if(res.data.status === 200) {
                  res.docs.map(rent => this.items.push(rent.customer));
                }
                else SwalFire(res.data.message, 'warning');
              });
            } else if(url === '/sales') {
              getRequest(url).then(res => {
                res.docs.map(sale => {
                  this.items.push(sale.customer);
                  this.items.push(sale.merchan);
                });
              });
            };
  }

  onTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];

    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
      this.setState(() => ({ suggestions, text: value }));
  }

  suggestionSelected (value) {
    this.setState({
      text: value,
      suggestions: [],
    });
  }

  renderSuggestions () {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestions.map((item) => {
          return(
          <li
            onClick={()=> this.suggestionSelected(item)}
            key={item.length}
            >{item}
          </li>
          );
        })}
      </ul>
    );

  }

  render() {
    const { text } = this.state;
    return(
      <Fragment>
        <label for={this.props.id}>{this.props.label}</label>
        <div className={this.props.className}>
          <div className="input-group-prepend">
            <span className="input-group-text">{this.props.icon}</span>
          </div>
          <input className="form-control"
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={text}
            type={this.props.type || "text"}
            tooltip={this.props.tooltip}
            url={this.props.url}
            onKeyDown={this.props.onChange}
            onClick={this.props.onChange}
            onChange={this.onTextChange}
          />
          <ul>
            {this.renderSuggestions()}
          </ul>
        </div>
      </Fragment>
    );
  }
}
