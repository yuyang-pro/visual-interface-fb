<template>
<div>
    <div style="margin:2em 3em 1em 2em">
      <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
        <Col span="2">
        <p>From</p>
        <AutoComplete v-model="from" :data="fromList" placeholder="City or airport" style="width:140px"></AutoComplete>
        </Col>

        <Col span="2">
        <p>To</p>
        <AutoComplete v-model="to" :data="toList" placeholder="City or airport" style="width:140px"></AutoComplete>
        </Col>

        <Col span="2">
        <p>Trip type</p>
        <Select v-model="type" @on-change="selectedType" placeholder="Please select" style="width: 130px">
        <Option v-for="item in tripList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>

        <Col span="2">
        <p>Depart date</p>
        <DatePicker type="date" format="dd/MM/yyyy" placeholder="Select date" style="width: 140px"></DatePicker>
        </Col>

        <Col span="2">
        <p>Return date</p>
        <DatePicker :disabled="isAble" format="dd/MM/yyyy" type="date" placeholder="Select date" style="width: 140px"></DatePicker>
        </Col>

        <Col span="2">
        <p>Class</p>
        <Select v-model="cabin" placeholder="Please select" style="width: 140px">
        <Option v-for="item in cabinList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>

        <Col span="2">
        <p>Adults&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children</p>
        <InputNumber :max="6" :min="1" v-model="adults" style="width: 50px"></InputNumber>
        <InputNumber :max="6" :min="1" v-model="children" style="width: 50px"></InputNumber>
        </Col>

        <Col span="2">
        <Button @click="emitToApp" :size="buttonSize" style="width: 120px;height: 40px" type="primary" icon="ios-search">Search</Button>
        </Col>
      </Row>
    </div>

    <div style="margin:3em 3em 1em 2.5em;zoom:0.9">
        <p style="font-size:large;text-indent: 2em">Add what you are interested (optional)</p>
        <div style="margin:1em 1em 1em 3em">
            <div style="display:inline-block;margin:0em 2em 0em 0em">
                <p style="font-size:13px;display:inline">Baggage allowance:  </p>
                <br>
                <Button @click="addCabinBag" shape="circle" size="small" style="margin:0px,8px,0px,0px"> + Cabin bag</Button>
                <Button @click="addCheckedBag"shape="circle" size="small" style="margin:4px"> + Checked bag</Button>
            </div>
            <div style="display:inline-block;margin:0em 2em 0em 0em">
                <p style="font-size:13px;display:inline">Comfort:  </p>
                <br>
                <Button @click="addPlaneType" shape="circle" size="small" style="margin:0px,4px,0px,0px"> + Plane type</Button>
                <Button @click="addSeatChoice" shape="circle" size="small" style="margin:4px"> + Seat choice</Button>
                <Button @click="addSeatPitch" shape="circle" size="small" style="margin:0px,4px,0px,0px"> + Seat pitch</Button>
            </div>
            <div style="display:inline-block;margin:0em 2em 0em 0em">
                <p style="font-size:13px;display:inline">Risks:  </p>
                <br>
                <Button disabled shape="circle" size="small" style="margin:0px,4px,0px,0px"> + On time performance</Button>
                <Button @click="addChange" shape="circle" size="small" style="margin:4px"> + Change</Button>
                <Button @click="addCancellation" shape="circle" size="small" style="margin:0px,4px,0px,0px"> + Cancellation</Button>
            </div>
            <div style="display:inline-block;margin:0em 2em 0em 0em">
                <p style="font-size:13px;display:inline">Flight service:  </p>
                <br>
                <Button @click="addMeal" shape="circle" size="small" style="margin:0px,4px,0px,0px"> + Meal</Button>
                <Button @click="addE" shape="circle" size="small" style="margin:4px"> + Entertainment</Button>
                <Button @click="addWifi" shape="circle" size="small" style="margin:0px,4px,0px,0px"> + Wifi</Button>
                <Button @click="addPower" shape="circle" size="small" style="margin:4px"> + Power</Button>
            </div>
        </div>
  </div>
</div>
   
</template>

<script>
import bus from '@/bus.js'
export default {
  name: 'Search',
  data () {
    return {
        from: '',
        fromList: ['Amsterdam(AMS)', 'Birmingham(BHX)', 'Glasow (GLA)', 'Sydney(SYD)'],
        to: '',
        toList: ['Istanbul(SAW)', 'Munich(MUC)', 'Nice (NCE)', 'Bangkok(BKK)'],
        cabin: '',
        tripList: [
            {
                value: 'Single',
                label: 'Single'
            },
            {
                value: 'Return',
                label: 'Return'
            },
        ],
        type: '',
        isAble: false,
        cabinList: [
            {
                value: 'Economy',
                label: 'Economy'
            },
            {
                value: 'Premium economy',
                label: 'Premium economy'
            },
            {
                value: 'Business',
                label: 'Business'
            },
            {
                value: 'First',
                label: 'First'
            },
        ],
        buttonSize: 'large',
        adults: 1,
        children: 0
    }
  },
  methods: {
        emitToApp() {
          if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var airline = ['Pegasus Airlines', 'Pegasus Airlines', 'Pegasus Airlines', 'Pegasus Airlines', 'Pegasus Airlines', 'Turkish Airlines', 'Pegasus Airlines', 'Lufthansa Cityline, Turkish Airlines', 'Lufthansa Cityline, Turkish Airlines', 'Lufthansa Cityline, Turkish Airlines', 'Lufthansa Cityline, Turkish Airlines', 'Lufthansa Cityline, Turkish Airlines', 'Lufthansa Cityline, Turkish Airlines']
            var dptTime = ['01:50','10:20','10:20','10:20','16:20','12:30','12:30','08:50','07:20','11:15','10:00','08:00','21:20']
            var arlTime = ['06:25', '20:05', '23:30', '07:15+1', '20:55', '16:55','17:05','16:35','16:35','18:05','18:05','18:05','16:35+1']
            var totDuration = [3.35,5.10,5.10,5.10,3.35,3.25,3.35,3.55,3.55,4.05,4.05,4.05,3.55]
            var stopDuration = [0,3.35,7.00,14.45,0,0,0,2.50,4.20,1.45,3.00,5.00,14.20]
            var stops = ['','ASR','ASR','ASR','','','','MUC','MUC','FRA','FRA','FRA','MUC']
            var price = [104,149,149,149,154,155,215,762,762,764,764,764,772]
            for (let i = 0; i < 13; i++) {
                    dd.push({
                    Airline: airline[i],
                    DepartAirport: 'AMS',
                    DepartTime: dptTime[i],
                    ArrivalAirport: 'SAW',
                    ArrivalTime: arlTime[i],
                    TotalDuration: totDuration[i],
                    Stopover: stopDuration[i],
                    Stops: stops[i],
                    Price: price[i]
                });
            }
            bus.$emit("eventFromSearch", dd)
          }
          if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var airline = ["Eurowings","KLM","KLM","SAS","Eurowings","Eurowings","Lufthansa","Brussels","Brussels","Brussels","Lufthansa","KLM","Brussels","Brussels","SAS","Lufthansa","Brussels","Air France","Air France","Brussels","Eurowings","Air France","Lufthansa","KLM","KLM","Air","Swiss","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Air France","Austrian","Air","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Air France","Air France","Swiss","Air France","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Swiss","Swiss","Lufthansa","Lufthansa","Lufthansa","Lufthansa","Austrian","Austrian","Austrian","Swiss","Lufthansa","Brussels","Air France","Flybe","SAS","Lufthansa","Lufthansa"]
            var dptTime = ["08:05","17:40","19:45","10:05","15:35","15:35","17:45","18:00","11:05","11:05","12:30","13:10","18:00","18:00","19:25","07:10","06:05","17:10","08:!5","06:05","19:50","13:55","06:15","09:15","06:00","11:35","08:40","06:15","06:15","06:15","18:15","06:15","11:35","08:25","08:15","13:10","11:05","06:15","13:10","13:10","06:40","06:40","08:40","13:55","08:55","08:55","08:55","11:05","08:40","08:40","08:55","08:55","18:00","06:15","08:25","08:25","08:25","08:40","06:05","06:05","06:40","08:15","19:25","17:45","06:15"]
            var arlTime = ["14:15","22:25","08:40","17:40","22:05","22:30","20:35","22:40","17:55","22:40","15:20","22:25","11:10","07:45","09:00","10:00","17:55","22:35","14:40","14:40","14:15+1","22:35","12:10","17:00","17:00","22:35","13:10","15:10","16:10","17:10","07:10+1","13:10","17:10","14:15","17:10","18:10","17:55","14:10","21:10","22:10","14:40","17:10","14:10","19:35","13:10","14:10","15:10","22:40","16:20","20:25","16:10","17:10","22:40","11:10","16:10","17:55","18:30","17:50","14:40","11:25","11:35","14:40","07:40+1","20:35","12:10"]
            var totDuration = [5.1,3.45,11.55,6.35,5.3,5.55,1.5,3.4,5.5,10.35,1.5,8.15,16.1,12.45,12.35,1.5,10.5,4.25,5.25,7.35,17.25,7.4,4.55,6.45,10,10,3.3,7.55,8.55,9.55,11.55,5.55,4.35,4.5,7.55,4,5.5,6.55,7,8,7,9.3,4.3,3.15,4.15,5.15,10.35,6.4,10.45,12.25,6.15,7.15,3.4,3.55,6.45,8.3,9.05,8.1,7.35,4.2,3.55,5.25,11.15,1.5,4.55]
            var stopDuration = [2.25,1.05,9.2,3.15,2.45,3.1,0,1.15,3.25,8.1,0,5.35,13.45,10.2,9.15,0,8.2,1.25,2.3,5.05,14.4,4.45,2.3,4.05,7.1,7,0.4,5.3,6.3,7.3,9.3,3.3,1.4,1.3,5.05,1.35,3.25,4.3,4.35,5.35,4,6.35,4.4,0.5,1.5,2.5,8.1,3.55,8,9.4,3.5,4.5,1.15,1.3,3.25,5.1,5.45,5.25,5.05,1.45,0.55,2.3,7.55,0,2.3]
            var stops = ["DUS","AMS","AMS","CPH","DUS","DUS","","BRU","BRU","BRU","MUC","AMS","BRU","BRU","CPH","","BRU","CDG","CDG","BRU","DUS","CDG","FRA","AMS","AMS","CDG","ZRH","FRA","FRA","FRA","FRA","FRA","CDG","VIE","DUS","CDG","FRA","BRU","FRA","FRA","FRA","CDG","CDG","ZRH","CDG","FRA","FRA","FRA","BRU","ZRH","ZRH","ZRH","FRA","FRA","BRU","FRA","VIE","VIE","VIE","ZRH","BRU","CDG","CPH","","BRU"]
            var price = [152,163,163,195,202,202,214,218,218,218,230,215,225,218,220,240,252,256,263,263,264,266,268,269,269,277,278,278,278,278,283,284,287,289,294,310,316,317,317,317,321,321,344,398,356,356,368,368,368,389,388,385,426,422,663,655,940,968,980,980,968,1002,1100,1122,1102]
            for (let i = 0; i < 65; i++) {
                    dd.push({
                    Airline: airline[i],
                    DepartAirport: 'BHX',
                    DepartTime: dptTime[i],
                    ArrivalAirport: 'MUC',
                    ArrivalTime: arlTime[i],
                    TotalDuration: totDuration[i],
                    Stopover: stopDuration[i],
                    Stops: stops[i],
                    Price: price[i]
                });
            }
            bus.$emit("eventFromSearch", dd)
          }
          if(this.from == 'Glasow (GLA)'){
            var dd = []
            var airline = ["BritishAirways","BritishAirways","BritishAirways","BritishAirways","BritishAirways","BritishAirways","BritishAirways","BritishAirways","KLM","KLM","KLM","KLM","BritishAirways","BritishAirways","BritishAirways","BritishAirways","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","BritishAirways","BritishAirways","Multiple","Multiple","Multiple","Multiple"]
            var dptTime = ["21:15","12:45","15:25","09:35","12:30","14:15","10:40","08:00","10:45","16:55","10:45","10:45","09:35","08:00","10:40","08:00","10:45","16:55","10:45","10:45","10:45","10:45","10:45","10:45","06:05","10:50","08:50","06:05","06:05","06:05","06:05"]
            var arlTime = ["10:30","19:00","23:55","18:50","18:50","20:50","18:50","18:50","16:15","22:25","18:40","22:25","17:25","14:35","17:25","17:25","16:15","22:25","18:40","22:25","19:45","19:45","22:20","22:20","11:25","16:25","16:25","16:45","16:45","14:20","14:20"]
            var totDuration = [12.15,5.15,7.3,8.15,5.2,5.35,7.1,9.5,4.3,4.3,6.55,10.4,6.5,5.35,5.45,8.25,4.3,4.3,6.55,10.4,8,8,10.35,10.35,4.2,4.35,6.25,9.4,9.4,7.15,7.15]
            var stopDuration = [8.4,1.35,4,4.3,1.4,2,3.3,6.1,1,1,3.15,7.1,3.1,2,2.1,4.5,1,1,3.15,7.1,3.4,3.4,6.15,6.15,0.4,1.05,3.05,5.3,5.3,2.4,2.4]
            var stops = ["LGW","LGW","LHR","LHR","LHR","LHR","LHR","LHR","AMS","AMS","AMS","AMS","LHR","LHR","LHR","LHR","AMS","AMS","AMS","AMS","AMS, CDG","AMS, CDG","AMS, CDG","AMS, CDG","AMS","LCY","LCY","AMS, LYS","AMS, LYS","AMS, CDG","AMS, CDG"]
            var price = [82,104,105,107,117,117,117,117,124,124,124,130,135,135,135,135,124,124,124,124,139,139,139,139,139,143,143,147,147,154,154]
            for (let i = 0; i < 31; i++) {
                    dd.push({
                    Airline: airline[i],
                    DepartAirport: 'GLA',
                    DepartTime: dptTime[i],
                    ArrivalAirport: 'NCE',
                    ArrivalTime: arlTime[i],
                    TotalDuration: totDuration[i],
                    Stopover: stopDuration[i],
                    Stops: stops[i],
                    Price: price[i]
                });
            }
            bus.$emit("eventFromSearch", dd)
          }
          if(this.from == 'Sydney(SYD)'){
            var dd = []
            var airline = ["Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Multiple","Scoot","Scoot","Scoot","Scoot","Scoot","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","AirAsia","Scoot","Scoot","Scoot","Scoot","Scoot","Philippine","Philippine","China","Malaysia","Emirates","Malaysia","Malaysia","China","Singapore","Singapore","Singapore","Singapore","Singapore","Qantas","Singapore","Singapore","Thai","Bangkok"]
            var dptTime = ["12:00","12:00","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","12:00","12:00","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","21:45","07:00","07:00","07:00","22:10","10:50","22:10","22:10","22:10","12:00","08:55","08:55","08:55","19:05","10:50","21:25","21:25","11:00","10:50"]
            var arlTime = ["20:50","21:55","07:50+1","08:45+1","09:30+1","11:55+1","12:40+1","13:55+1","14:45+1","15:30+1","09:50 +1","14:35 +1","16:55 +1","19:25 +1","23:45 +1","20:50","21:55","07:50 +1","08:45 +1","09:30 +1","11:55 +1","12:40 +1","13:55 +1","14:45 +1","15:30 +1","09:50 +1","14:35 +1","16:55 +1","19:25 +1","23:45 +1","16:45","21:50","21:50","12:10 +1","16:40","10:15 +1","13:25 +1","09:45 +1","20:00","17:25","19:00","20:00","08:35 +1","16:40","08:35 +1","11:05 +1","16:20","16:40"]
            var totDuration = [12.5,13.55,14.55,15,15.45,18.1,18.55,20.1,21,21.45,16.05,20.5,23.1,25.4,30,12.5,13.55,14.05,15,15.45,18.1,18.55,20.1,21,21.45,16.05,20.5,23.1,25.4,30,13.45,18.5,18.5,18,9.5,16.05,19.15,15.35,12,12.3,14.05,15.05,17.3,9.5,15.1,17.4,9.2,9.5]
            var stopDuration = [1.4,2.45,2.05,3.45,4.4,7.05,7.45,9,9.5,10.35,5.5,9.4,12.1,14.45,19.5,1.4,2.45,2.55,3.45,4.4,7.3,7.45,9,9.5,10.35,5.5,9.4,12.1,14.45,19.5,2.1,6.55,4.45,2.15,0,5,8.15,2.25,1,1.45,3.15,4.15,6.5,0,3.35,6,0,0]
            var stops = ["KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","SIN","SIN","SIN","SIN","SIN","KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","KUL","SIN","SIN","SIN","SIN","SIN","MNL","MNL","TPE","KUL"," ","KUL","KUL","TPE","SIN","SIN","SIN","SIN","SIN"," ","CBR, SIN ","CBR, SIN "," "," "]
            var price = [141,141,141,141,141,141,141,141,141,141,149,149,149,149,149,181,181,181,181,181,181,181,181,181,181,188,188,188,188,188,238,238,244,316,340,316,316,244,378,378,378,378,378,340,378,378,463,483]
            for (let i = 0; i < 48; i++) {
                    dd.push({
                    Airline: airline[i],
                    DepartAirport: 'SYD',
                    DepartTime: dptTime[i],
                    ArrivalAirport: 'BKK',
                    ArrivalTime: arlTime[i],
                    TotalDuration: totDuration[i],
                    Stopover: stopDuration[i],
                    Stops: stops[i],
                    Price: price[i]
                });
            }
            bus.$emit("eventFromSearch", dd)
          }
        },
        addCabinBag(){
            if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var cabinBag = ['free','free','free','free','free','free','free','free','free','free','free','free','free']
            for (let i = 0; i < 13; i++) {
                dd.push({CabinBag: cabinBag[i]})
            }
            bus.$emit("eventFromAddCabinBag", dd)
            }
            if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var cabinBag = ["Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free"]
            for (let i = 0; i < 65; i++) {
                dd.push({CabinBag: cabinBag[i]})
            }
            bus.$emit("eventFromAddCabinBag", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var cabinBag = ["Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free"]
            for (let i = 0; i < 31; i++) {
                dd.push({CabinBag: cabinBag[i]})
            }
            bus.$emit("eventFromAddCabinBag", dd)
            }
            if(this.from == 'Sydney(SYD)'){
            var dd = []
            var cabinBag = ["Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free","Free"]
            for (let i = 0; i < 48; i++) {
                dd.push({CabinBag: cabinBag[i]})
            }
            bus.$emit("eventFromAddCabinBag", dd)
            }
        },
        addCheckedBag(){
            if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var checkedBag1st = [15,15,15,15,15,0,15,0,0,0,0,0,0]
            var checkedBag2nd = [15,15,15,15,15,8,15,150,150,150,150,150,150]
            for (let i = 0; i < 13; i++) {
                dd.push({CheckedBag1st: checkedBag1st[i],CheckedBag2nd: checkedBag2nd[i]})
            }
            bus.$emit("eventFromAddCheckedBag", dd)
            }
            if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var checkedBag1st = [26,45,45,70,26,26,0,0,0,0,0,45,0,0,70,0,0,45,45,0,26,45,0,45,45,45,0,0,0,0,0,0,45,0,45,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            var checkedBag2nd = [66,70,70,70,66,66,0,40,40,40,0,70,40,40,70,0,40,70,70,40,66,70,0,70,70,70,80,0,0,0,0,0,70,80,70,0,0,0,0,0,80,70,0,0,0,0,80,80,80,0,0,0,0,80,80,80,80,0,80,35,0,0,0,0,0]
            for (let i = 0; i < 65; i++) {
                dd.push({CheckedBag1st: checkedBag1st[i],CheckedBag2nd: checkedBag2nd[i]})
            }
            bus.$emit("eventFromAddCheckedBag", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var checkedBag1st = [0,0,0,0,0,0,0,0,45,45,45,45,0,0,0,0,45,45,45,45,45,45,45,0,0,45,45,45,45,45,45]
            var checkedBag2nd = [65,65,65,65,65,65,65,65,75,75,75,75,65,65,65,65,75,75,75,75,75,75,75,65,65,75,75,75,75,75,75]
            for (let i = 0; i < 31; i++) {
                dd.push({CheckedBag1st: checkedBag1st[i],CheckedBag2nd: checkedBag2nd[i]})
            }
            bus.$emit("eventFromAddCheckedBag", dd)
            }
            if(this.from == 'Sydney(SYD)'){
            var dd = []
            var checkedBag1st = [15,15,15,15,15,15,15,15,15,15,0,0,0,0,0,15,15,15,15,15,15,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            // var checkedBag2nd = []
            for (let i = 0; i < 48; i++) {
                dd.push({CheckedBag1st: checkedBag1st[i]})
            }
            bus.$emit("eventFromAddCheckedBag", dd)
            }
        },
        addPlaneType(){
            if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var planeType = ["Narrow-body","Wide-body","Regional","Regional","Turboprop","Regional","Regional","Regional","Turboprop","Narrow-body","Narrow-body","Wide-body","Narrow-body","Narrow-body","Regional","Regional","Regional","Regional","Narrow-body","Regional","Regional","Regional","Regional","Regional","Narrow-body","Regional","Regional","Regional","Turboprop","Regional","Narrow-body","Regional","Regional","Regional","Narrow-body","Regional","Wide-body","Regional","Narrow-body","Regional","Wide-body","Turboprop","Regional","Regional","Narrow-body","Regional","Regional","Narrow-body","Wide-body","Regional","Regional","Regional","Regional","Turboprop","Wide-body","Turboprop","Wide-body","Wide-body","Turboprop","Wide-body","Narrow-body","Wide-body","Wide-body","Narrow-body","Turboprop"]
            for (let i = 0; i < 65; i++) {
                dd.push({PlaneType: planeType[i]})
            }
            bus.$emit("eventFromAddPlaneType", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var planeType = ["Narrow-body","Regional","Regional","Regional","Regional","Narrow-body","Regional","Regional","Regional","Regional","Regional","Narrow-body","Regional","Regional","Regional","Turboprop","Narrow-body","Narrow-body","Wide-body","Narrow-body","Regional","Regional","Narrow-body","Regional","Regional","Regional","Narrow-body","Regional","Narrow-body","Regional","Wide-body"]
            for (let i = 0; i < 31; i++) {
                dd.push({PlaneType: planeType[i]})
            }
            bus.$emit("eventFromAddPlaneType", dd)
            }
        },
        addSeatChoice(){
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var seatChoice = ["Allowed","Not","Not","Allowed","Not","Not","Not","Not","Not","Not","Allowed","Allowed","Allowed","Not","Allowed","Allowed","Not","Not","Allowed","Allowed","Allowed","Not","Allowed","Allowed","Not","Not","Not","Allowed","Not","Allowed","Allowed"]
            for (let i = 0; i < 31; i++) {
                dd.push({SeatChoice: seatChoice[i]})
            }
            bus.$emit("eventFromAddSeatChoice", dd)
            }
        },
        addSeatPitch(){
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var seatPitch = [28,30,30,30,30,28,30,30,30,31,31,29,30,30,31,32,28,29,31,29,29,29,30,30,31,32,29,31,31,29,30]
            for (let i = 0; i < 31; i++) {
                dd.push({SeatPitch: seatPitch[i]})
            }
            bus.$emit("eventFromAddSeatPitch", dd)
            }
        },
        addChange(){
            if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var change = ["Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed"]
            for (let i = 0; i < 65; i++) {
                dd.push({Change: change[i]})
            }
            bus.$emit("eventFromAddChange", dd)
            }
            if(this.from == 'Sydney(SYD)'){
            var dd = []
            var change = ["Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed"]
            for (let i = 0; i < 48; i++) {
                dd.push({Change: change[i]})
            }
            bus.$emit("eventFromAddChange", dd)
            }
        },
        addCancellation(){
            if(this.from == 'Birmingham(BHX)'){
            var dd = []
            var cancellation = ["Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed"]
            for (let i = 0; i < 65; i++) {
                dd.push({Cancellation: cancellation[i]})
            }
            bus.$emit("eventFromAddCancellation", dd)
            }
            if(this.from == 'Sydney(SYD)'){
            var dd = []
            var cancellation = ["Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed","Not allowed"]
            for (let i = 0; i < 48; i++) {
                dd.push({Cancellation: cancellation[i]})
            }
            bus.$emit("eventFromAddCancellation", dd)
            }
        },
        addMeal(){
            if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var meal = ['not incluede','not incluede','not incluede','not incluede','not incluede','include','not incluede','include','include','include','include','include','include']
            for (let i = 0; i < 13; i++) {
                dd.push({Meal: meal[i]})
            }
            bus.$emit("eventFromAddMeal", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var meal = ["Not include","Not include","Not include","Not include","Not include","Include","Not include","Include","Include","Include","Include","Include","Include","Not include","Include","Not include","Include","Include","Include","Include","Not include","Include","Not include","Include","Include","Include","Include","Not include","Include","Not include","Include"]
            for (let i = 0; i < 31; i++) {
                dd.push({Meal: meal[i]})
            }
            bus.$emit("eventFromAddMeal", dd)
            }
        },
        addE(){
            if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var e = ['include','include','include','include','include','include','include','include','include','include','include','include','include']
            for (let i = 0; i < 13; i++) {
                dd.push({Entertainment: e[i]})
            }
            bus.$emit("eventFromAddE", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var e =["Include","Include","Include","Not include","Include","Not include","Include","Include","Not include","Include","Include","Include","Include","Not include","Include","Include","Include","Include","Not include","Not include","Not include","Include","Not include","Not include","Include","Not include","Include","Include","Not include","Include","Include"]
            for (let i = 0; i < 31; i++) {
                dd.push({Entertainment: e[i]})
            }
            bus.$emit("eventFromAddE", dd)
            }
        },
        addWifi(){
            if(this.from == 'Amsterdam(AMS)'){
            var dd = []
            var wifi = ['not incluede','not incluede','not incluede','not incluede','not incluede','not incluede','not incluede','not incluede','not incluede','not incluede','include','include','include']
            for (let i = 0; i < 13; i++) {
                dd.push({Wifi: wifi[i]})
            }
            bus.$emit("eventFromAddWifi", dd)
            }
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var wifi = ["Not include","Not include","Not include","Not include","Not include","Not include","Not include","Not include","Not include","Not include","Include ","Include ","Include ","Not include","Not include","Not include","Not include","Not include","Include ","Include ","Include ","Not include","Not include","Not include","Not include","Include ","Include ","Include ","Not include","Not include","Not include"]
            for (let i = 0; i < 31; i++) {
                dd.push({Wifi: wifi[i]})
            }
            bus.$emit("eventFromAddWifi", dd)
            }
        },
        addPower(){
            if(this.from == 'Glasow (GLA)'){
            var dd = []
            var power = ["Include","Include","Not include","Include","Include","Include","Not include","Not include","Not include","Include","Include","Not include","Not include","Not include","Not include","Include","Include","Not include","Include","Not include","Include","Include","Not include","Not include","Include","Not include","Include","Include","Not include","Include","Not include"]
            for (let i = 0; i < 31; i++) {
                dd.push({Power: power[i]})
            }
            bus.$emit("eventFromAddPower", dd)
            }
        },
        selectedType(t) {
            if(t == 'Single') {
                this.isAble = true;
            }else {
                this.isAble = false;
            }
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>