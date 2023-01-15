
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const MeetBiz = require('../../../biz/meet_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLogin: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {
		let sortItem1 = [];

		let sortItems = [];

		let sortMenus = [{ label: '全部', type: '', value: '' }];

		if (MeetBiz.getCateList().length > 1) {
			sortMenus = sortMenus.concat(MeetBiz.getCateList());
		}

		sortMenus = sortMenus.concat([
			{ label: '可使用', type: 'use', value: '' },
			{ label: '已过期', type: 'timeout', value: '' },
			{ label: '系统取消', type: 'cancel', value: '' }
		]);



		this.setData({
			search: '',
			sortItems,
			sortMenus,
			isLoad: true
		});

	},
	bindCancelTap: async function (e) {
		let callback = async () => {
			let joinId = pageHelper.dataset(e, 'id');
			try {
				let params = {
					joinId
				}
				let opts = {
					title: '取消中'
				}

				await cloudHelper.callCloudSumbit('meet/my_join_cancel', params, opts).then(res => {
					pageHelper.delListNode(joinId, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showNoneToast('取消成功');
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认取消该预约?', callback);
	}
})