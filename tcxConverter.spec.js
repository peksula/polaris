/**
 * Parser unit tests.
 */

var chai = require('chai');
var expect = chai.expect;

var TcxConverter = require('./tcxConverter');

describe('TcxConverter', function() {

    let converter = TcxConverter;

    beforeEach(function() {
        converter = new TcxConverter();
    });

    describe('convertToJson', function() {
        it('returns empty FeatureCollection for TCX file without trackpoints', function() {
            const emptyXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
                <Activities>
                    <Activity Sport="Other">
                        <Id>2019-01-30T15:31:04.000+02:00</Id>
                        <Creator xsi:type="Device_t" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                            <Name>Fitbit Surge</Name>
                            <UnitId>0</UnitId>
                            <ProductID>0</ProductID>
                        </Creator>
                    </Activity>
                </Activities>
            </TrainingCenterDatabase>`

            expect(converter.convertToJson(emptyXml).features).have.lengthOf(0);
        });

        it('returns FeatureCollection for TCX file with trackpoints', function() {
            const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
                <Activities>
                    <Activity Sport="Running">
                        <Id>2019-01-27T12:31:16.000+02:00</Id>
                        <Lap StartTime="2019-01-27T12:31:16.000+02:00">
                            <TotalTimeSeconds>675.0</TotalTimeSeconds>
                            <DistanceMeters>1000.0</DistanceMeters>
                            <Calories>104</Calories>
                            <Intensity>Active</Intensity>
                            <TriggerMethod>Manual</TriggerMethod>
                            <Track>
                                <Trackpoint>
                                    <Time>2019-01-27T12:31:16.000+02:00</Time>
                                    <Position>
                                        <LatitudeDegrees>60.184268832206726</LatitudeDegrees>
                                        <LongitudeDegrees>25.06240200996399</LongitudeDegrees>
                                    </Position>
                                    <AltitudeMeters>31.6</AltitudeMeters>
                                    <DistanceMeters>0.0</DistanceMeters>
                                    <HeartRateBpm>
                                        <Value>98</Value>
                                    </HeartRateBpm>
                                </Trackpoint>
                                <Trackpoint>
                                    <Time>2019-01-27T12:31:21.000+02:00</Time>
                                    <Position>
                                        <LatitudeDegrees>60.184268832206727</LatitudeDegrees>
                                        <LongitudeDegrees>25.06240200996398</LongitudeDegrees>
                                    </Position>
                                    <AltitudeMeters>31.6</AltitudeMeters>
                                    <DistanceMeters>0.0</DistanceMeters>
                                    <HeartRateBpm>
                                        <Value>97</Value>
                                    </HeartRateBpm>
                                </Trackpoint>
                            </Track>
                        </Lap>
                        <Creator xsi:type="Device_t" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                            <Name>Fitbit Surge</Name>
                            <UnitId>0</UnitId>
                            <ProductID>0</ProductID>
                        </Creator>
                    </Activity>
                </Activities>
            </TrainingCenterDatabase>`
            jsonObject = converter.convertToJson(xml)
            expect(jsonObject.features).have.lengthOf(1);
            expect(jsonObject.properties.totalMeters).to.equal(1000);
            expect(jsonObject.properties.totalSeconds).to.equal(675);
            expect(jsonObject.features[0].geometry.type).to.equal('LineString');
            expect(jsonObject.features[0].geometry.coordinates).to.have.lengthOf(2);
            expect(jsonObject.features[0].geometry.coordinates[0].includes(25.06240200996399)).to.be.true;
            expect(jsonObject.features[0].geometry.coordinates[0].includes(60.184268832206726)).to.be.true;
            expect(jsonObject.features[0].geometry.coordinates[1].includes(25.06240200996398)).to.be.true;
            expect(jsonObject.features[0].geometry.coordinates[1].includes(60.184268832206727)).to.be.true;
        });

    });
});
