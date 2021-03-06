import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './Home.scss'
import RootStore from '@/store/rootStore';

const { Item } = Form

interface HomeProps extends FormComponentProps {
  Home: any,
  rootStore: RootStore
}

@observer
class Home extends React.Component<HomeProps, {}> {
    constructor(props: HomeProps) {
      super(props)
    }

    componentDidMount() {

    }

    render() {
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 1 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
      }
      const { form: { getFieldDecorator }, rootStore: { homeStore } } = this.props
        return (
            <div>
                <div className={styles.main}>

                </div>

                Home
                <br />
                <p>num: { homeStore.num }</p>
                <Button type='primary' onClick={() => homeStore.add()}>确定</Button>
                <br />
                <Link to='/about'>About</Link>
                <br />
                <Link to='/spreadSheet'>spreadSheet</Link>
                <Form>
                  <Item
                    {...formItemLayout}
                    label="用户名"
                  >
                    {getFieldDecorator('username', {
                      rules: [
                        { required: true },
                      ],
                    })(
                      <Input />,
                    )}
                  </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({
  onValuesChange(props) {
    console.log(props)
  },
  mapPropsToFields() {

  },
})(Home)
