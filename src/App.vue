<template>
  <div>
<!--    <a-button class="editable-add-btn" @click="handleread">-->
<!--      查看全部用户{{temp_value}}-->
<!--    </a-button>-->
    <div>
      <a-button type="primary" @click="showModal">
        新增用户{{temp_value}}
      </a-button>
      <a-modal v-model="visible" title="新增用户信息" @ok="handleOk">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="Name">
            <a-input v-model = input_name />
          </a-form-item>
          <a-form-item label="Telephone">
            <a-input v-model = input_tel />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model = input_email />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
<!--    <a-button class="editable-add-btn" @click="handleAdd">-->
<!--      添加新用户{{temp_value}}-->
<!--    </a-button>-->
    <a-table :columns="columns" :data-source="data" bordered>
      <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              style="padding: 8px"
      >
        <a-input
                v-ant-ref="c => (searchInput = c)"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block;"
                @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template
              v-for="col in ['name', 'tel', 'email']"
              :slot="col"
              slot-scope="text, record"
      >
        <div :key="col">
          <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
<!--          <a-popconfirm-->
<!--                  v-if="data.length"-->
<!--                  title="Sure to delete?"-->
<!--                  @confirm="() => onDelete(record.key)"-->
<!--          >-->
<!--            <a href="javascript:;">Delete</a>-->
<!--          </a-popconfirm>-->
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            <a-popconfirm
                    v-if="data.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record.key)"
            >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </span>
        </div>
      </template>
    </a-table>
  </div>

</template>
<script>
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '5%',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        //customRender: 'customRender',
        customRender: 'id',
      },
      onFilter: (value, record) =>
              record.id
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          }, 0);
        }
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        //customRender: 'customRender',
        customRender: 'name',
      },
      onFilter: (value, record) =>
              record.name
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          }, 0);
        }
      },
    },
    {
      title: 'tel',
      dataIndex: 'tel',
      width: '15%',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        //customRender: 'customRender',
        customRender: 'tel',
      },
      onFilter: (value, record) =>
              record.tel
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '35%',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        //customRender: 'customRender',
        customRender: 'email',
      },
      onFilter: (value, record) =>
              record.email
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  const data = [];
  // for (let i = 0; i < 5; i++) {
  //   data.push({
  //     key: i.toString(),
  //     name: `Edrward ${i}`,
  //     tel: 32,
  //     email: `London Park no. ${i}`,
  //   });
  // }

  export default {
    data() {
      this.cacheData = data.map(item => ({ ...item }));
      return {
        data,
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        columns,
        editingKey: '',
        count: 0,
        max_key:0,
        temp_value: 0,
        visible: false,
        form: this.$form.createForm(this, { name: 'coordinated' }),
        input_name: '',
        input_tel: '',
        input_email: '',
      };
    },
    methods: {
      handleread:function () {
            var url = 'http://172.19.83.92:8080/users/?skip=0&limit=100'
            this.axios.get(url)
                .then(res => {
                    //console.log(res.data[0]['name'])
                  const temp_data = []
                  const key_list =[]
                  for (let i = 0; i < res.data.length; i++) {
                    key_list.push(res.data[i]['id'] - 1);
                    temp_data.push({
                      key: res.data[i]['id'] - 1,
                      name: res.data[i]['name'],
                      tel: res.data[i]['tel'],
                      email: res.data[i]['email'],
                    });
                  }
                  // if (key_list.length === 0) {this.max_key = -1;}
                  // else{key_list.sort(function(a,b){return b-a});
                  //   this.max_key =  key_list[0];}
                  this.data = temp_data;
                  //this.temp_value = this.max_key;
                })
                .catch(err => {
                    alert(err)
                })

      },
      handleChange(value, key, column) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.data = newData;
        }
      },
      onDelete(key) {
        const newData = [...this.data];
        this.data = newData.filter(item => item.key !== key);
        this.editingKey = '';
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
        }

        var url = 'http://172.19.83.92:8080/users/' + (target['id']).toString()
        this.axios.delete(url)
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  alert(err)
                })
      },

      handleAdd() {
        const { max_key, data } = this;
        const cur_key = max_key + 1
        const newData = {
          key: cur_key,
          name: "XXX" + cur_key.toString(),
          tel: "XXX" + cur_key.toString(),
          email: "XXX" + cur_key.toString(),
        };
        this.data = [...data, newData];
        this.cacheData = this.data.map(item => ({ ...item }));
        this.editingKey = '';
        //this.max_key = cur_key

        var url = 'http://172.19.83.92:8080/users/'
        this.axios.post(url,{
                  id: cur_key,
                  name: "XXX" + cur_key.toString(),
                  tel: "XXX" + cur_key.toString(),
                  email: "XXX" + cur_key.toString()
                })
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  alert(err)
                })
      },
      edit(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      },
      save(key) {
        const newData = [...this.data];
        const newCacheData = [...this.cacheData];
        var target = newData.filter(item => key === item.key)[0];
        this.temp_value = this.data;

        var url = 'http://172.19.83.92:8080/users/' + (target['id']).toString()
        this.axios.put(url,{
                      id: newData.filter(item => key === item.key)[0]['id'],
                      name: newData.filter(item => key === item.key)[0]['name'],
                      tel: newData.filter(item => key === item.key)[0]['tel'],
                      email: newData.filter(item => key === item.key)[0]['email']
                    })
                .then(res => {
                  console.log(res);

                })
                .catch(err => {
                  alert(err)
                })

        //const targetCache = newCacheData.filter(item => key === item.key)[0];
        // if (target && targetCache) {
        //   delete target.editable;
        //   this.data = newData;
        //   Object.assign(targetCache, target);
        //   this.cacheData = newCacheData;
        // }
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;
          this.cacheData = newCacheData;
          delete target.editable;
        }
        this.editingKey = '';

      },
      cancel(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;
        }
      },

      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },

      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },

      showModal() {
          this.visible = true;
        },
      handleOk() {
        var url = 'http://172.19.83.92:8080/users/?skip=0&limit=100'
        this.axios.get(url)
                .then(res => {
                  var max_key = 0
                  var key_list =[]
                  for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i]['id'] > max_key) {max_key = res.data[i]['id'];}
                    key_list.push(res.data[i]['id']);
                  }
                  if (key_list.length === 0) {max_key = 0;}
                  else{key_list.sort(function(a,b){return b-a});
                    max_key =  key_list[0];}
                  //max_key = res.data[res.data.length-1]['id'];
                  //this.temp_value = max_key;
                  this.max_key = max_key + 1;
                  //this.temp_value = this.max_key;

                  const { data } = this;
                  const cur_key = data.length
                  const newData = {
                    key: cur_key,
                    id: max_key + 1,
                    name: this.input_name,
                    tel: this.input_tel,
                    email: this.input_email,
                  };
                  this.data = [...data, newData];
                  this.cacheData = this.data.map(item => ({ ...item }));
                  this.editingKey = '';
                  //this.max_key = cur_key

                  this.input_name = '';
                  this.input_tel = '';
                  this.input_email = '';
                  this.visible = false;
                })
                .catch(err => {
                  alert(err)
                })
        this.temp_value = this.max_key;
        var cur_id = this.temp_value;
        //this.temp_value = cur_id;
        url = 'http://172.19.83.92:8080/users/'
        this.axios.post(url,{
                id: cur_id,
                name: this.input_name,
                tel: this.input_tel,
                email: this.input_email
              })
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => {
                    alert(err)
                  })

        // const { data } = this;
        // const cur_key = data.length
        // const newData = {
        //   key: cur_key,
        //   id: cur_id,
        //   name: this.input_name,
        //   tel: this.input_tel,
        //   email: this.input_email,
        // };
        // this.data = [...data, newData];
        // this.cacheData = this.data.map(item => ({ ...item }));
        // this.editingKey = '';
        // //this.max_key = cur_key
        //
        // this.input_name = '';
        // this.input_tel = '';
        // this.input_email = '';
        // this.visible = false;
      },
    },
    created: function(){
      var url = 'http://172.19.83.92:8080/users/?skip=0&limit=100'
      this.axios.get(url)
              .then(res => {
                //console.log(res.data[0]['name'])
                const temp_data = []
                const key_list =[]
                for (let i = 0; i < res.data.length; i++) {
                  key_list.push(res.data[i]['id'] - 1);
                  temp_data.push({
                    key: i,
                    id: res.data[i]['id'],
                    name: res.data[i]['name'],
                    tel: res.data[i]['tel'],
                    email: res.data[i]['email'],
                  });
                }
                // if (key_list.length === 0) {this.max_key = -1;}
                // else{key_list.sort(function(a,b){return b-a});
                //   this.max_key =  key_list[0];}
                this.data = temp_data;
                //this.temp_value = this.max_key;
              })
              .catch(err => {
                alert(err)
              })
    },
  };
</script>
<style scoped>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }

  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
