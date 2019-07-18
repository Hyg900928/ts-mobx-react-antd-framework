import React, { useState } from 'react'
import { Input, Form, Button, Icon } from 'antd'
import { Props } from './index'

const { Item } = Form;


interface HeadProps extends Props {
  key: string;
  id: number;
}

const HeadItem = (props: HeadProps) => {
  const { form: { getFieldDecorator, getFieldValue, setFieldsValue } } = props
    const [id, setId] = useState(props.id)
    // const [keys, setKeys] = useState([])/
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  // 初始化
  getFieldDecorator('keys', { initialValue: [] });

  const keys = getFieldValue('keys')
  console.log(keys)
  const add = () => {
    // const keys = getFieldValue('keys')
    const nextKeys = keys.concat(id);
    setFieldsValue({
      keys: nextKeys,
    })
  }
  const removeKey = (k) => {
    // const keys = getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }
  const formItems = keys.map((k, index) => (
    <Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? '表头名' : ''}
      required={false}
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: '必填项',
          },
        ],
      })(<Input style={{ width: '60%', marginRight: 8 }} />)}
      {keys.length > 1 ? (
        <Icon
          type='minus-circle-o'
          onClick={() => removeKey(k)}
        />
      ) : null }
    </Item>
  ))

  return (
    <>
      { formItems }
      <Item { ...formItemLayoutWithOutLabel }>
          <Button type="dashed" onClick={add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加子表头
          </Button>
      </Item>
    </>
  )
}

export default HeadItem
