import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import van-button from 'vant-weapp/dist/button/index'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { changeUserName } from '../../actions/userInfo'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  },
  userInfo:{
    userName: string
  }
}

type PageDispatchProps = {
  add: () => void,
  dec: () => void,
  asyncAdd: () => any

  // fieldEdit:()=>any
  // counterLog:()=>any
  // onClick:()=>any
  // onChange:()=>any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter, userInfo}) => ({
  counter,userInfo
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  onClick(num){
    dispatch(counterLog())
  },
  changeUserName(){
    dispatch(changeUserName())
  }

}))

class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      // "van-row": '../../components/vant-weapp/dist/row/index',
      // "van-col": '../../components/vant-weapp/dist/col/index',
      'van-cell-group': '../../components/vant-weapp/dist/cell-group/index',
      'van-field': '../../components/vant-weapp/dist/field/index',
      'van-button': '../../components/vant-weapp/dist/button/index',
      'van-panel': '../../components/vant-weapp/dist/panel/index'
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onChange(){
    let _userName = this.props.userInfo.userName
    console.log("change the field with value: "  + _userName)
  }
  onClick(){
    let num = this.props.counter.num
    console.log("the counter current num: " + num)
  }
  render () {
    let value ='我是神秘的测试用户'
    return (
      <View className='index'>
      <van-panel title='测试Vant组件' borde={true}>
      <van-cell-group>
      <van-cell>
      <view className='index' slot="title">
  <van-field
    value={ this.props.userInfo.userName }
    placeholder="请输入用户名"

    border={true }
    onChange={this.onChange.bind(this)}
  />

  </view>
  </van-cell>
  <van-cell>
  <view slot="title">
  <van-button type='primary' size='small' onClick={this.onClick.bind(this)}>测试 VantWeapp</van-button>
  </view>
  </van-cell>

  <van-cell title="单元格" is-link />
  <van-cell title="单元格" is-link value="内容" />
  <van-cell
    title="单元格"
    is-link
    arrow-direction="down"
    value="内容"
    border="{{ false }}"
    url="/pages/dashboard/index"
  />
</van-cell-group>


        </van-panel>
        <van-panel title='测试Taro-UI组件'>
        <AtButton type='primary' size='small'
        onClick={this.onClick.bind(this)}
        >测试 AtButton</AtButton>
        </van-panel>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
