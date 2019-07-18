import React, { FormEvent } from 'react'
import { observer } from 'mobx-react'
import { Form, Button, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import RootStore from '@/store/rootStore'
import HeadItem from './HeadItem'


export interface Props extends FormComponentProps {
  rootStore: RootStore;
}

@observer
class EditorTable extends React.Component<Props, any> {
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  addHead = () => {
    const { rootStore: { customTableStore: { num, setStore, add, heads } } } = this.props

    add()
  }

  onStateChange = (value: any) => {
    this.setState({ id: value.id })
  }

  render() {
    const { rootStore: { customTableStore: { add, num, id, heads, setStore } } } = this.props
    // const { heads, num, id } = this.state


    return (
      <div>
        <Row>
          <Col span={5}>

          </Col>
          <Col span={12}>
            <h2>配置表单</h2>
            <p>{num}</p>
            <Button type='primary' onClick={ this.addHead}>+添加表头</Button>
            {/* <p style={{ padding: '10px 0' }}>一级表头数: { num }</p> */}
          </Col>
        </Row>

        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          {
            heads.map(n => (
              <HeadItem key={`num[${n}]`} {...this.props} id={ id } />
            ))
          }
        </Form>
      </div>
    )
  }
}

export default Form.create()(EditorTable)
